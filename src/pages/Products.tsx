import { useState } from "react";
import { Link } from "react-router-dom";
import {
  products,
  productTypeLabels,
  brandCoverage,
  axes,
  type ProductKey,
  type ProductType,
  type ProductSize,
} from "../data/products";

const typeOrder: ProductType[] = ["commercial", "organic", "cloth", "tampon"];

const typeDescriptions: Record<ProductType, string> = {
  commercial:
    "Standard disposable pads with synthetic absorbent cores and plastic backing. Designed for maximum fluid retention.",
  organic:
    "Disposable pads made primarily from organic cotton. Free from synthetic fragrances and chlorine bleaching.",
  cloth:
    "Reusable washable pads made from fabric layers. Lower absorption capacity by design but significantly more sustainable.",
  tampon:
    "Inserted cotton/rayon plugs that absorb fluid internally. Compact and discreet but limited by insertion volume.",
};

const previewAxes = axes.filter(
  (a) => a.key !== "capacity" && a.key !== "rate",
);

const allKeys = Object.keys(products) as ProductKey[];

function ScoreCell({ value }: { value: number | null }) {
  if (value === null) return <span className="text-slate-400">—</span>;
  return <span className="font-medium text-slate-800">{value.toFixed(1)}</span>;
}

function SizeDots({ size, color }: { size: ProductSize; color: string }) {
  const maxAbsorbency = 7;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-slate-600 font-medium min-w-[100px]">
        {size.label}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: maxAbsorbency }, (_, i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full border border-slate-300"
            style={
              i < size.absorbency
                ? { background: color, borderColor: color }
                : {}
            }
          />
        ))}
      </div>
      <span className="text-slate-500">
        {size.pads} pad{size.pads !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

function ProductCard({ k }: { k: ProductKey }) {
  const p = products[k];
  return (
    <Link
      to={`/products/${k}`}
      className="group border border-slate-200 rounded-2xl shadow-sm hover:border-rose-300 hover:bg-rose-50/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 flex-shrink-0">
          <img
            src={p.image}
            alt={p.label}
            className="w-full h-48 sm:h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
          />
        </div>
        <div className="flex-1 p-4 sm:p-6 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: p.color }}
            />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {p.brand}
            </span>
            {p.price !== null && (
              <span className="text-sm font-semibold text-slate-700 ml-auto">
                €{p.price.toFixed(2)}
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">{p.label}</h3>
          {p.sizes.length > 0 && (
            <div className="mb-4 space-y-1">
              {p.sizes.map((s) => (
                <SizeDots key={s.label} size={s} color={p.color} />
              ))}
            </div>
          )}
          {p.price !== null && p.sizes.length > 0 && (
            <p className="text-xs text-slate-500 mb-3">
              €
              {(p.price / p.sizes.reduce((sum, s) => sum + s.pads, 0)).toFixed(
                2,
              )}{" "}
              per pad
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-2 text-sm">
            {previewAxes.map(({ key, label }) => (
              <div key={key} className="min-w-0">
                <p className="text-xs text-slate-500 mb-0.5 whitespace-nowrap">
                  {label}
                </p>
                <ScoreCell value={p.scores[key]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Products() {
  const [search, setSearch] = useState("");

  const query = search.toLowerCase().trim();
  const hasFilter = query.length > 0;

  const filtered = allKeys.filter(
    (k) =>
      !query ||
      products[k].label.toLowerCase().includes(query) ||
      products[k].brand.toLowerCase().includes(query),
  );

  const byType = typeOrder.map((type) => ({
    type,
    label: productTypeLabels[type],
    keys: filtered.filter((k) => products[k].type === type),
  }));

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-rose-500 uppercase">
            Products
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-950 mt-1 sm:mt-2 mb-2 sm:mb-3">
            Products Tested
          </h1>
          <p className="text-base sm:text-lg text-slate-700 whitespace-normal sm:whitespace-nowrap">
            Seven branded products across four categories. Scores are on a scale
            of 0-10, (higher means better).
          </p>
        </div>

        {/* Search bar */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {hasFilter ? (
          /* Flat list when searching/sorting */
          <div className="space-y-6">
            {filtered.length === 0 ? (
              <p className="text-base text-slate-600 text-center py-12">
                No products match your search.
              </p>
            ) : (
              filtered.map((k) => <ProductCard key={k} k={k} />)
            )}
          </div>
        ) : (
          /* Grouped by category when no filter */
          <div className="space-y-12">
            {byType.map(({ type, label, keys }) => (
              <section key={type}>
                <h2 className="text-lg sm:text-xl font-bold text-slate-950 mb-1">
                  {label}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mb-4">
                  {typeDescriptions[type]}
                </p>
                <div className="space-y-6">
                  {keys.map((k) => (
                    <ProductCard key={k} k={k} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Brand Coverage Matrix */}
        <section className="mt-12 sm:mt-16">
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 mb-3 sm:mb-4">
            Brand Coverage
          </h2>
          <p className="text-sm sm:text-base text-slate-700 mb-4 sm:mb-6 max-w-3xl">
            Which brands offer which product types. Our study covers five brands
            across all four categories.
          </p>
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-5 py-3 text-left font-semibold text-slate-600">
                    Brand
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-600">
                    Tampons
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-600">
                    Organic Pads
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-600">
                    Commercial Pads
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-600">
                    Cloth Pads
                  </th>
                </tr>
              </thead>
              <tbody>
                {brandCoverage.map((row, i) => (
                  <tr
                    key={row.brand}
                    className={i % 2 === 0 ? "" : "bg-slate-50/50"}
                  >
                    <td className="px-5 py-3 font-medium text-slate-900">
                      {row.brand}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.tampon ? (
                        <span className="text-emerald-600 font-semibold">
                          ✓
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.organic ? (
                        <span className="text-emerald-600 font-semibold">
                          ✓
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.commercial ? (
                        <span className="text-emerald-600 font-semibold">
                          ✓
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.cloth ? (
                        <span className="text-emerald-600 font-semibold">
                          ✓
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
