import type { Registrant } from "../libs/Registrant";

export default function UserRegisterCard({
  registrant,
}: {
  registrant: Registrant;
}) {
  return <div className="card p-3 mb-3 shadow-sm">
    <div className="d-flex justify-content-between">
      <span className="fw-semibold">{registrant.fullName}</span>
      <span>{registrant.total.toLocaleString()} THB</span>
    </div>
    <small className="text-muted">
      {registrant.plan} · {registrant.gender === "male" ? "👨 Male" : "👩 Female"}
    </small>
    <div>
      <div className="d-flex">
        <div className="mt-1 d-flex flex-wrap gap-1">
          {registrant.Items.map((e) => (
            <span className="badge text-bg-light border">{e}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
}