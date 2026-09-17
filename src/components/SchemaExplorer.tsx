"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SchemaTable {
  id: string;
  name: string;
  category: "auth" | "core" | "financial";
  comment: string;
  fields: {
    name: string;
    type: string;
    constraint?: "PK" | "FK" | "UNIQUE" | "INDEX";
    ref?: string;
  }[];
  indexInfo: string;
}

const TABLES: SchemaTable[] = [
  {
    id: "users",
    name: "users",
    category: "auth",
    comment: "Master user authentication & state",
    fields: [
      { name: "id", type: "UUID", constraint: "PK" },
      { name: "email", type: "VARCHAR(255)", constraint: "UNIQUE" },
      { name: "password_hash", type: "VARCHAR(255)" },
      { name: "role_id", type: "INT UNSIGNED", constraint: "FK", ref: "roles.id" },
      { name: "status", type: "ENUM('active','suspended')", constraint: "INDEX" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
    indexInfo: "Composite Index: idx_role_status (role_id, status) for 0.4ms RBAC filtering",
  },
  {
    id: "roles",
    name: "roles",
    category: "auth",
    comment: "4-Level Hierarchical RBAC definitions",
    fields: [
      { name: "id", type: "INT UNSIGNED", constraint: "PK" },
      { name: "slug", type: "VARCHAR(50)", constraint: "UNIQUE" },
      { name: "tier_level", type: "TINYINT", constraint: "INDEX" },
      { name: "description", type: "VARCHAR(150)" },
    ],
    indexInfo: "Covering Index on (tier_level, slug) for instant authorization checks",
  },
  {
    id: "orders",
    name: "orders",
    category: "core",
    comment: "DDD Order Aggregate Root & Transactions",
    fields: [
      { name: "id", type: "UUID", constraint: "PK" },
      { name: "user_id", type: "UUID", constraint: "FK", ref: "users.id" },
      { name: "total_cents", type: "BIGINT UNSIGNED" },
      { name: "status", type: "VARCHAR(32)", constraint: "INDEX" },
      { name: "payment_ref", type: "VARCHAR(128)", constraint: "UNIQUE" },
      { name: "placed_at", type: "TIMESTAMP", constraint: "INDEX" },
    ],
    indexInfo: "Clustered index with B-Tree partition on (user_id, placed_at DESC)",
  },
  {
    id: "transactions",
    name: "inventory_ledger",
    category: "financial",
    comment: "High-throughput double-entry audit trail",
    fields: [
      { name: "id", type: "BIGINT UNSIGNED", constraint: "PK" },
      { name: "order_id", type: "UUID", constraint: "FK", ref: "orders.id" },
      { name: "amount_delta", type: "DECIMAL(12,4)" },
      { name: "balance_snapshot", type: "DECIMAL(12,4)" },
      { name: "hash_checksum", type: "CHAR(64)" },
      { name: "created_at", type: "TIMESTAMP", constraint: "INDEX" },
    ],
    indexInfo: "Optimized append-only schema: sub-millisecond atomic inserts via PDO",
  },
];

export default function SchemaExplorer() {
  const [selectedTable, setSelectedTable] = useState<SchemaTable>(TABLES[0]);
  const [activeTab, setActiveTab] = useState<"schema" | "architecture" | "code">("schema");

  return (
    <section id="architecture-live" className="py-24 px-6 border-t border-[var(--border)] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] block mb-2">
              Deep Technical Mastery //
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Relational Schemas & Clean Core
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Real architectural blueprints: strictly typed relational database schemas, zero-framework domain isolation, and high-throughput query optimization.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-[var(--surface-1)] border border-[var(--border)] font-mono text-xs shadow-sm min-w-full sm:min-w-0">
              <button
                onClick={() => setActiveTab("schema")}
                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "schema"
                    ? "bg-[var(--accent)] text-[#080a0f] font-bold shadow-md"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                SQL Schema
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "architecture"
                    ? "bg-[var(--accent-cyan)] text-[#080a0f] font-bold shadow-md"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                DDD Layers
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "code"
                    ? "bg-[var(--text-primary)] text-[var(--background)] font-bold shadow-md"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Clean Code
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: SQL Relational Schema */}
        {activeTab === "schema" && (
          <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Mobile Table Picker: Compact Horizontal Rail */}
            <div className="lg:hidden overflow-x-auto scrollbar-none -mx-4 px-4 pb-1">
              <div className="inline-flex gap-2 min-w-full">
                {TABLES.map((table) => {
                  const isSelected = selectedTable.id === table.id;
                  return (
                    <button
                      key={table.id}
                      type="button"
                      onClick={() => setSelectedTable(table)}
                      style={{ touchAction: "manipulation" }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap border transition-all cursor-pointer flex items-center gap-2 active:scale-95 ${
                        isSelected
                          ? "bg-[var(--accent)] text-[#080a0f] border-[var(--accent)] shadow-md"
                          : "bg-[var(--surface-1)] text-[var(--text-secondary)] border-[var(--border)]"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[#080a0f]" : "bg-[var(--accent)]"}`} />
                      <span>{table.name}</span>
                      <span className="text-[10px] opacity-70">({table.fields.length})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Left: Table Picker */}
            <div className="hidden lg:block lg:col-span-4 space-y-3">
              <span className="text-[11px] font-mono tracking-wider text-[var(--text-tertiary)] uppercase block mb-1">
                Select Relational Table
              </span>
              {TABLES.map((table) => {
                const isSelected = selectedTable.id === table.id;
                return (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    className={`w-full p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[var(--surface-2)] border-[var(--accent)] shadow-[0_0_20px_rgba(0,245,160,0.12)]"
                        : "bg-[var(--surface-1)] border-[var(--border)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`} />
                        {table.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-tertiary)] uppercase">
                        {table.fields.length} cols
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                      {table.comment}
                    </p>
                  </button>
                );
              })}

              <div className="p-4 rounded-xl bg-[var(--surface-1)] border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)] mt-4 shadow-sm">
                <span className="text-[var(--accent)] font-bold block mb-1">Database Principles:</span>
                • 3NF normalized structures<br />
                • Explicit FK cascading rules<br />
                • Zero N+1 query patterns
              </div>
            </div>

            {/* Right: Table Inspector Schema */}
            <div className="lg:col-span-8 p-5 sm:p-8 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] backdrop-blur-xl shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
                <div>
                  <h3 className="text-lg font-mono font-bold text-[var(--text-primary)] flex items-center gap-3">
                    TABLE: <span className="text-[var(--accent)]">{selectedTable.name}</span>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">
                    {selectedTable.comment}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-md bg-[var(--surface-2)] text-[var(--accent-cyan)] font-mono text-xs border border-[var(--border)]">
                  InnoDB Engine · UTF8MB4
                </span>
              </div>

              {/* Fields Table */}
              <div className="flex items-center justify-between mt-6 mb-2">
                <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                  Schema Definition ({selectedTable.fields.length} Columns)
                </span>
                <span className="text-[10px] font-mono text-[var(--accent-cyan)] block sm:hidden">
                  ← Swipe table →
                </span>
              </div>
              <div className="overflow-x-auto scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-[var(--text-tertiary)] border-b border-[var(--border)] uppercase text-[10px] tracking-wider">
                      <th className="pb-3 font-semibold">Column Name</th>
                      <th className="pb-3 font-semibold">Data Type</th>
                      <th className="pb-3 font-semibold">Constraint</th>
                      <th className="pb-3 font-semibold">Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {selectedTable.fields.map((field) => (
                      <tr key={field.name} className="hover:bg-[var(--surface-3)]/50 transition-colors">
                        <td className="py-3 font-semibold text-[var(--text-primary)]">
                          {field.name}
                        </td>
                        <td className="py-3 text-[var(--accent-cyan)]">
                          {field.type}
                        </td>
                        <td className="py-3">
                          {field.constraint ? (
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                field.constraint === "PK"
                                  ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30"
                                  : field.constraint === "FK"
                                  ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                                  : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                              }`}
                            >
                              {field.constraint}
                            </span>
                          ) : (
                            <span className="text-[var(--text-tertiary)]/40">—</span>
                          )}
                        </td>
                        <td className="py-3 text-[var(--text-tertiary)]">
                          {field.ref ? (
                            <span className="text-purple-400 underline decoration-dotted">
                              {field.ref}
                            </span>
                          ) : (
                            "None"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Indexing Footnote */}
              <div className="mt-6 p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                <div className="text-xs font-mono">
                  <span className="text-[var(--text-primary)] font-bold">Query Optimization Strategy:</span>
                  <p className="text-[var(--text-secondary)] mt-0.5">
                    {selectedTable.indexInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: DDD Layer Separation */}
        {activeTab === "architecture" && (
          <div className="p-8 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] backdrop-blur-xl shadow-2xl">
            <div className="max-w-3xl mb-8">
              <h3 className="text-xl font-mono font-bold text-[var(--text-primary)]">
                The Inverted Dependency Rule (Clean Architecture)
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                Core domain business rules are isolated in the center. Frameworks, ORMs, and transport protocols are pushed to the outermost ring as plugins.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-[var(--surface-2)] border border-[var(--accent)] shadow-[0_0_20px_rgba(0,245,160,0.1)]">
                <span className="text-[10px] font-mono text-[var(--accent)] uppercase font-bold block mb-1">
                  LAYER 1 // CORE
                </span>
                <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Domain Entities</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Pure PHP OOP objects. Zero Laravel imports. Encapsulates business invariants and domain rules.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[var(--surface-2)] border border-[var(--accent-cyan)]">
                <span className="text-[10px] font-mono text-[var(--accent-cyan)] uppercase font-bold block mb-1">
                  LAYER 2 // LOGIC
                </span>
                <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Use Cases / Application</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Orchestrates flow of data between entities and repository interfaces. Coordinates operations.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block mb-1">
                  LAYER 3 // ADAPTERS
                </span>
                <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Interface Adapters</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Controllers, API Resource Presenters, DTOs, and Repository implementations.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                <span className="text-[10px] font-mono text-orange-400 uppercase font-bold block mb-1">
                  LAYER 4 // DRIVERS
                </span>
                <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">Framework & Drivers</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Laravel routing, MySQL PDO, Redis cache, and external 3rd-party payment gateways.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Clean Code Sample */}
        {activeTab === "code" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] backdrop-blur-xl font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)] text-[var(--text-tertiary)]">
              <span className="text-[var(--accent)] font-bold">src/Domain/Order/Entity/OrderAggregate.php</span>
              <span>Pure PHP · Zero Framework Dependency</span>
            </div>
            <pre className="text-[var(--text-primary)] leading-relaxed overflow-x-auto">
{`<?php

declare(strict_types=1);

namespace Domain\\Order\\Entity;

use Domain\\Order\\ValueObject\\Money;
use Domain\\Order\\Exception\\DomainValidationException;

/**
 * Domain Aggregate Root representing an immutable business contract.
 * Note: Zero dependencies on Laravel, Eloquent, or DB drivers.
 */
final class OrderAggregate
{
    private string $id;
    private Money $total;
    private string $status;

    public function __construct(string $id, Money $total)
    {
        if ($total->isZeroOrNegative()) {
            throw new DomainValidationException("Order value must exceed zero.");
        }

        $this->id = $id;
        $this->total = $total;
        $this->status = 'INITIALIZED';
    }

    public function transitionToProcessing(): void
    {
        if ($this->status !== 'INITIALIZED') {
            throw new DomainValidationException("Illegal state transition.");
        }
        $this->status = 'PROCESSING';
    }

    public function getTotal(): Money { return $this->total; }
    public function getStatus(): string { return $this->status; }
}`}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
