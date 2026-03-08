box::use(
  testthat[...],
  dplyr,
  lubridate,
  memoise,
  stringr,
)

box::use(
  app /
    logic /
    fetch_data[
      fetch_catalogue,
      cache_catalogue,
      get_catalogue,
      clear_cache,
    ],
)


# ── Helpers ───────────────────────────────────────────────────────────────────

make_raw_catalogue <- function() {
  dplyr::tibble(
    name = c("  Dataset A  ", "Dataset B"),
    id = c("ds-001", "ds-002"),
    description = c("  Desc A  ", "Desc B"),
    category = c("  Transport  ", "Finance"),
    updated_at = c("2024-01-15 10:00:00", "2024-06-01 08:30:00"),
    row_count = c("1200", NA_character_),
    url = c("https://example.com/ds-001", "https://example.com/ds-002")
  )
}

# Applies the same mutate pipeline as fetch_catalogue() against a fixture,
# so we can test the transformation logic without a wpgdata/network dependency.
apply_fetch_transforms <- function(raw) {
  raw |>
    dplyr::mutate(
      updated_at = lubridate::as_datetime(updated_at),
      row_count = as.integer(dplyr::coalesce(as.numeric(row_count), 0)),
      name = stringr::str_squish(name),
      description = stringr::str_squish(description),
      category = stringr::str_squish(category),
      url = as.character(url)
    )
}


# ══════════════════════════════════════════════════════════════════════════════
# fetch_catalogue() — transformation logic
#
# These test the dplyr::mutate pipeline that cleans the raw API response.
# No network call is made — we pass a fixture directly.
# ══════════════════════════════════════════════════════════════════════════════

describe("fetch_catalogue() — transformation logic", {
  it("produces a tibble with the expected columns", {
    result <- apply_fetch_transforms(make_raw_catalogue())
    expect_s3_class(result, "tbl_df")
    expect_true(all(
      c(
        "name",
        "id",
        "description",
        "category",
        "updated_at",
        "row_count",
        "url"
      ) %in%
        names(result)
    ))
  })

  it("coerces updated_at to POSIXct", {
    result <- apply_fetch_transforms(make_raw_catalogue())
    expect_s3_class(result$updated_at, "POSIXct")
  })

  it("coerces row_count to integer and converts NA to 0L", {
    result <- apply_fetch_transforms(make_raw_catalogue())
    expect_type(result$row_count, "integer")
    expect_equal(result$row_count[1], 1200L)
    expect_equal(result$row_count[2], 0L)
  })

  it("trims whitespace from name, description, and category", {
    result <- apply_fetch_transforms(make_raw_catalogue())
    expect_equal(result$name[1], "Dataset A")
    expect_equal(result$description[1], "Desc A")
    expect_equal(result$category[1], "Transport")
  })

  it("coerces url to character even when input is a factor", {
    raw <- make_raw_catalogue()
    raw$url <- as.factor(raw$url)
    result <- apply_fetch_transforms(raw)
    expect_type(result$url, "character")
  })
})


# ══════════════════════════════════════════════════════════════════════════════
# cache_catalogue()
# ══════════════════════════════════════════════════════════════════════════════

describe("cache_catalogue()", {
  it("is a memoised function", {
    expect_true(memoise::is.memoised(cache_catalogue))
  })
})


# ══════════════════════════════════════════════════════════════════════════════
# clear_cache()
# ══════════════════════════════════════════════════════════════════════════════

describe("clear_cache()", {
  it("emits a confirmation message", {
    expect_message(clear_cache(), regexp = "Catalogue cache cleared")
  })

  it("is idempotent — two consecutive calls do not error", {
    expect_no_error({
      suppressMessages(clear_cache())
      suppressMessages(clear_cache())
    })
  })
})
