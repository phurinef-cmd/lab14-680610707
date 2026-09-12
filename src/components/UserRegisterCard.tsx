import type { Registrant } from "../libs/Registrant";

export default function UserRegisterCard({
  registrant,
}: {
  registrant: Registrant;
}) {
  return (
    <div className="card p-3 mb-3">
      <h5>{registrant.fullName}</h5>

      <div>
        {registrant.gender === "male" ? "👨 Male" : "👩 Female"}
      </div>

      <div>
        Plan: {registrant.plan}
      </div>

      <div>
        Total Payment: {registrant.total.toLocaleString()} THB
      </div>
    </div>
  );
}