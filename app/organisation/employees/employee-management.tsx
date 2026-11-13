"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy } from "lucide-react";
import {
  addEmployee,
  setEmployeeStatus,
} from "@/app/actions/organisation";
import type {
  AddEmployeeState,
  OrganisationEmployee,
} from "@/types/organisation";

const initialState: AddEmployeeState = {};

const fields = [
  { name: "fullName", label: "Full name", required: true },
  { name: "email", label: "Email", required: false, type: "email" },
  { name: "employeeId", label: "Employee ID", required: false },
  { name: "department", label: "Department", required: false },
  { name: "designation", label: "Designation", required: false },
  { name: "officeLocation", label: "Office location", required: false },
] as const;

export function EmployeeManagement({
  employees,
}: {
  employees: OrganisationEmployee[];
}) {
  const [state, formAction, isPending] = useActionState(
    addEmployee,
    initialState
  );
  const [notice, setNotice] = useState("");

  return (
    <section aria-labelledby="employees-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl" id="employees-heading">
            Employees
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Manage registered employees and pending invitations.
          </p>
        </div>
        <p className="text-sm font-semibold text-[var(--peri)]">
          {employees.length} total
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-[var(--line)] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-[var(--cream-2)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Name
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Employee ID
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Department
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Designation
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Office location
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Status
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Invite code
                </th>
                <th className="px-4 py-3 font-semibold" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {employees.map((employee) => (
                <EmployeeRow
                  employee={employee}
                  key={employee.id}
                  onNotice={setNotice}
                />
              ))}
              {employees.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-[var(--muted)]"
                    colSpan={8}
                  >
                    No employees yet. Add an employee below to create an invite.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {notice && (
        <p className="mt-4 text-sm" role="status">
          {notice}
        </p>
      )}

      <section
        aria-labelledby="add-employee-heading"
        className="mt-9 rounded-xl border border-[var(--line)] bg-white p-5 sm:p-6"
      >
        <h3 className="text-2xl" id="add-employee-heading">
          Add employee
        </h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          An invite code will be created after the employee is added.
        </p>
        <form action={formAction} className="mt-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {fields.map((field) => {
              const errors = state.fieldErrors?.[field.name];
              return (
                <div className="flex flex-col gap-1.5" key={field.name}>
                  <label className="text-sm font-semibold" htmlFor={field.name}>
                    {field.label}
                    {field.required && (
                      <span className="text-[var(--primary)]"> *</span>
                    )}
                  </label>
                  <input
                    aria-describedby={
                      errors?.length ? `${field.name}-error` : undefined
                    }
                    aria-invalid={Boolean(errors?.length)}
                    autoComplete={
                      field.name === "fullName"
                        ? "name"
                        : field.name === "email"
                          ? "email"
                          : undefined
                    }
                    className="min-h-11 rounded-lg border border-[var(--line)] bg-[var(--cream)] px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--peri)]"
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    type={"type" in field ? field.type : "text"}
                  />
                  {errors?.length ? (
                    <span
                      className="text-xs text-[var(--primary-dark)]"
                      id={`${field.name}-error`}
                    >
                      {errors.join(" ")}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
          {state.message && (
            <p
              className={`mt-4 text-sm ${
                state.success
                  ? "text-[var(--peri)]"
                  : "text-[var(--primary-dark)]"
              }`}
              role={state.success ? "status" : "alert"}
            >
              {state.message}
            </p>
          )}
          {state.inviteCode && (
            <p className="mt-4 flex flex-wrap items-center gap-2 rounded-lg bg-[var(--peri-soft)] px-4 py-3 text-sm">
              <span className="font-semibold">Invite code:</span>
              <code className="font-bold tracking-wider">{state.inviteCode}</code>
            </p>
          )}
          <button
            className="mt-5 min-h-11 rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-white hover:bg-[var(--primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--peri)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Adding employee..." : "Add employee"}
          </button>
        </form>
      </section>
    </section>
  );
}

function EmployeeRow({
  employee,
  onNotice,
}: {
  employee: OrganisationEmployee;
  onNotice: (message: string) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const canChangeStatus = Boolean(employee.user_id) && employee.status !== "invited";
  const nextStatus = employee.status === "active" ? "inactive" : "active";

  async function copyInviteCode() {
    if (!employee.invite_code) {
      onNotice("This invite does not have a code to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(employee.invite_code);
      onNotice(`Invite code for ${employee.full_name} copied.`);
    } catch {
      onNotice("Could not copy the invite code. Select and copy it manually.");
    }
  }

  function changeStatus() {
    startTransition(async () => {
      const result = await setEmployeeStatus(employee.id, nextStatus);
      onNotice(result.message);
      if (result.success) {
        router.refresh();
      }
    });
  }

  return (
    <tr>
      <td className="px-4 py-3 font-semibold">{employee.full_name}</td>
      <td className="px-4 py-3">{employee.employee_id || "—"}</td>
      <td className="px-4 py-3">{employee.department || "—"}</td>
      <td className="px-4 py-3">{employee.designation || "—"}</td>
      <td className="px-4 py-3">{employee.office_location || "—"}</td>
      <td className="px-4 py-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
            employee.status === "active"
              ? "bg-[var(--peri-soft)] text-[var(--peri)]"
              : employee.status === "invited"
                ? "bg-[var(--blush)] text-[var(--primary-dark)]"
                : "bg-[var(--cream-2)] text-[var(--muted)]"
          }`}
        >
          {employee.status}
        </span>
      </td>
      <td className="px-4 py-3">
        {employee.status === "invited" && employee.invite_code ? (
          <span className="inline-flex items-center gap-2">
            <code>{employee.invite_code}</code>
            <button
              aria-label={`Copy invite code for ${employee.full_name}`}
              className="inline-flex min-h-9 items-center gap-1 rounded-md border border-[var(--line)] px-2 text-xs font-semibold hover:bg-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--peri)]"
              onClick={copyInviteCode}
              type="button"
            >
              <Copy aria-hidden="true" size={14} />
              Copy
            </button>
          </span>
        ) : (
          "—"
        )}
      </td>
      <td className="px-4 py-3">
        {canChangeStatus ? (
          <button
            className="min-h-9 rounded-md border border-[var(--line)] px-3 text-xs font-semibold hover:bg-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--peri)] disabled:opacity-60"
            disabled={isPending}
            onClick={changeStatus}
            type="button"
          >
            {isPending
              ? "Saving..."
              : employee.status === "active"
                ? "Deactivate"
                : "Reactivate"}
          </button>
        ) : (
          <span className="text-xs text-[var(--muted)]">—</span>
        )}
      </td>
    </tr>
  );
}
