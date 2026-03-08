# Claude Prompt — Winnipeg Open Data Rhino Shiny Dashboard

> Paste this entire prompt into a new Claude chat to resume where you left off.
> Ask Claude to build one chunk at a time (see outlined sections at the bottom).

---

## Context

You are helping me build a production-grade **R Shiny dashboard** using the **Rhino framework** (by Appsilon: https://appsilon.github.io/rhino/) to explore the **Winnipeg Open Data catalogue**.

---

## Data Source

The data comes from the R package `wpgdata` (https://myominnoo.github.io/wpgdata/articles/getting-started.html).

The primary data-fetching call is:

```r
catalogue <- wpgdata::peg_catalogue(limit = NULL)
```

This returns a `tibble` with **216 rows × 7 columns** and **26 unique categories**:

| Column       | Type      | Description                                      |
|--------------|-----------|--------------------------------------------------|
| `name`       | `<chr>`   | Dataset name (e.g., "Plow Zone Schedule")        |
| `id`         | `<chr>`   | Unique dataset ID (e.g., "tix9-r5tc")            |
| `description`| `<chr>`   | Free-text description of the dataset             |
| `category`   | `<chr>`   | One of 26 categories (e.g., "City Planning")     |
| `updated_at` | `<dttm>`  | Last updated datetime                            |
| `row_count`  | `<int>`   | Number of rows in the dataset                    |
| `url`        | `<chr>`   | Direct link, e.g. "https://data.winnipeg.ca/d/…" |

**Note:** `wpgdata::peg_catalogue()` makes a live API call to the Winnipeg Open Data portal each time it runs. This should be called once at app startup and cached in a reactive value or global object.

---

## App Goals & Audience

**Priority order (most important first):**
1. **Demo / Showcase** — must look impressive and polished; this is a public-facing portfolio piece
2. **Category Analytics** — meaningful charts and aggregations by category
3. **Internal / Staff use** — navigable and functional for power users
4. **Personal exploration** — discoverable for casual users

**All four of these features must be included:**
- Dataset search & filtering (keyword, category, date range, row count)
- Category analytics & charts
- Freshness / staleness tracking (when was each dataset last updated?)
- Clickable links to actual datasets on data.winnipeg.ca
- Modern, sleek UX/UI (not generic; Winnipeg-branded feel)

---

## Technical Requirements

### Framework: Rhino (mandatory)

Use the **Rhino framework** strictly. Key rules from the Rhino docs:

- Entry point is `app.R` (do NOT edit it): `rhino::app()`
- Top-level UI/server go in `app/main.R`
- **`logic/`** — pure R functions with no Shiny dependency (data fetching, transformation, aggregation)
- **`view/`** — Shiny modules only (`ui` + `server` functions, exported with `#' @export`)
- All imports via `box::use()` — NO `library()`, NO `source()`
- Modules use `shiny::NS()` and `shiny::moduleServer()` pattern
- Config goes in `rhino.yml`

### Coding Style (mandatory)

- Always use **explicit namespacing**: `dplyr::mutate()`, `shiny::reactive()`, `plotly::plot_ly()`, etc.
- Never use bare function calls without the package prefix
- Use the **native pipe** `|>` (not `%>%`)
- Prefer `dplyr` for all data wrangling, `lubridate` for dates, `plotly` for interactive charts, `DT` for tables

### UI Stack

- `bslib::page_navbar()` for layout with `bslib::nav_panel()` tabs
- `bslib::card()`, `bslib::value_box()` for components
- Custom SCSS via `app/styles/main.scss` (Rhino handles compilation)
- Winnipeg colour palette: Navy `#003366`, Gold `#FFB300`, White `#FFFFFF`, Light grey `#F5F5F5`
- Google Font pairing: **Syne** (display/headings) + **DM Sans** (body)

---

## App Architecture (Rhino file structure)

```
app/
├── main.R                  # Top-level ui + server, calls all view modules
├── logic/
│   ├── data.R              # peg_catalogue() fetching + caching helpers
│   ├── transform.R         # Aggregation: by category, freshness buckets, etc.
│   └── utils.R             # Shared helpers (e.g., format_date, staleness_label)
├── view/
│   ├── header.R            # App header / navbar branding
│   ├── overview.R          # Tab 1: KPI cards + summary charts
│   ├── explorer.R          # Tab 2: Searchable DT table with filters
│   ├── analytics.R         # Tab 3: Category bar charts, treemap
│   └── freshness.R         # Tab 4: Staleness heatmap / timeline
└── styles/
    └── main.scss           # Custom SCSS (Winnipeg palette, fonts, overrides)
```

---

## Outlined Build Chunks (build ONE at a time)

When I ask you to build a chunk, produce **only that chunk** — don't write the full app at once.

### Chunk 1 — Project Scaffold & Config
- `rhino.yml` config
- `app/styles/main.scss` skeleton with Winnipeg palette + Google Fonts import
- `app/main.R` skeleton wiring all modules
- `dependencies.R` / `renv` package list

### Chunk 2 — Logic Layer: `app/logic/data.R`
- `fetch_catalogue()` — wraps `wpgdata::peg_catalogue(limit = NULL)` with error handling
- `cache_catalogue()` — memoised version using `memoise::memoise()` or a simple environment cache
- Column-type assertions / light cleaning with `dplyr::mutate()` + `lubridate::as_datetime()`

### Chunk 3 — Logic Layer: `app/logic/transform.R`
- `summarise_by_category()` — count, mean row_count per category
- `compute_freshness()` — adds `days_since_update`, `freshness_label` ("Fresh <30d", "Aging 30–180d", "Stale >180d")
- `filter_catalogue()` — takes filter inputs (keyword, categories, date range, row_count range), returns filtered `tibble`

### Chunk 4 — Logic Layer: `app/logic/utils.R`
- `format_last_updated()` — human-readable relative time ("2 days ago")
- `make_clickable_url()` — returns HTML `<a>` tag for DT rendering
- `freshness_colour()` — maps label to hex colour for consistent use across modules

### Chunk 5 — View: `app/view/overview.R` (Tab 1 — KPI + Summary)
- `ui`: 4 `bslib::value_box()` cards (total datasets, categories, most recently updated, largest dataset by row_count)
- `ui`: `plotly` horizontal bar chart of datasets per category
- `server`: all reactives wired to shared `catalogue` reactive passed from `main.R`

### Chunk 6 — View: `app/view/explorer.R` (Tab 2 — Search & Filter)
- `ui`: sidebar with `shiny::textInput()` keyword search, `shiny::selectizeInput()` category multi-select, `shiny::sliderInput()` for date range and row_count range
- `ui`: `DT::dataTableOutput()` with clickable URL column
- `server`: reactive filtered table using `logic/transform.R::filter_catalogue()`

### Chunk 7 — View: `app/view/analytics.R` (Tab 3 — Category Analytics)
- `ui`: `plotly` treemap of datasets by category (sized by total row_count)
- `ui`: `plotly` scatter plot — row_count vs. days_since_update, coloured by category
- `server`: all chart reactives

### Chunk 8 — View: `app/view/freshness.R` (Tab 4 — Freshness Tracker)
- `ui`: stacked bar chart — freshness label distribution per category
- `ui`: sortable summary table of "most stale" datasets with link to URL
- `server`: reactives using `logic/transform.R::compute_freshness()`

### Chunk 9 — View: `app/view/header.R` (Branding)
- Custom navbar with Winnipeg logo/wordmark area
- Subtitle: "Winnipeg Open Data Explorer"
- Last-refreshed timestamp badge

### Chunk 10 — Polish & SCSS
- Full `app/styles/main.scss`: card shadows, custom value_box colours, navbar styling, table row hover, font sizing, mobile responsiveness hints
- Any remaining `bslib` theming via `bslib::bs_theme()`

---

## Instructions for Claude

- **Do not write the full app in one response.** Wait for me to request a specific chunk.
- Always use `box::use()` for all imports — never `library()`.
- Always namespace every function call: `dplyr::filter()`, `shiny::reactive()`, etc.
- Use `|>` not `%>%`.
- Each `view/` module must export `ui` and `server` with `#' @export`.
- When writing `logic/` files, functions must be pure R — no Shiny reactivity.
- Add brief inline comments (`# reason`) for non-obvious lines.
- If a function signature has more than 3 arguments, name all arguments explicitly at call sites.
- For charts, always use `plotly::ggplotly()` or native `plotly::plot_ly()` — never static `ggplot2` alone.
- For tables, always use `DT::datatable()` with `DT::formatStyle()` for conditional formatting.
