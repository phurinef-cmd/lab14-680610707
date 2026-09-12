import { useState } from "react";
import type { Registrant } from "../libs/Registrant";

//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];

// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);

  const selectedPlan = plans.find((item) => item.id === plan);
  const planPrice = selectedPlan ? selectedPlan.price : 0;

  const extraPrice = extraItems
    .filter((item) => extras.includes(item.id))
    .reduce((total, item) => total + item.price, 0);

  const isDiscount = extras.length === extraItems.length;
  const discount = isDiscount ? extraPrice * 0.2 : 0;
  const totalPayment = planPrice + extraPrice - discount;

  const handleExtraChange = (id: string, checked: boolean) => {
    if (checked) {
      setExtras([...extras, id]);
    } else {
      setExtras(extras.filter((item) => item !== id));
    }
  };

  const handleRegister = () => {
    if (!firstName || !lastName || !plan || !gender || !agree) {
      alert("Please complete all information.");
      return;
    }

    const registration: Registrant = {
      id: Date.now(),
      fullName: `${firstName} ${lastName}`,
      gender,
      plan,
      total: totalPayment,
    };

    const registrations: Registrant[] = JSON.parse(
      localStorage.getItem("registrations") || "[]"
    );

    registrations.push(registration);

    localStorage.setItem(
      "registrations",
      JSON.stringify(registrations)
    );

    alert(
      `Registration successful!\nTotal Payment : ${totalPayment.toLocaleString()} THB`
    );

    setFirstName("");
    setLastName("");
    setPlan("");
    setGender("");
    setExtras([]);
    setAgree(false);
  };

  return (
    <div
      className="modal fade"
      id="modalregister"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="d-flex gap-2">
              <div>
                <label className="form-label">First name</label>

                <input
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Last name</label>

                <input
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="form-label">Plan</label>

              <select
                className="form-select"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                <option value="">Please select..</option>

                {plans.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label} ({item.price.toLocaleString()} THB)
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-2">
              <label className="form-label">Gender</label>

              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />

                Male 👨

                <input
                  className="mx-2 form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />

                Female 👩
              </div>
            </div>

            {/* Extra Items */}

            <div>
              <label className="form-label">Extra Item(s)</label>

              {extraItems.map((item) => (
                <div key={item.id}>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    checked={extras.includes(item.id)}
                    onChange={(e) =>
                      handleExtraChange(
                        item.id,
                        e.target.checked
                      )
                    }
                  />

                  <label className="form-check-label">
                    {item.label} ({item.price.toLocaleString()} THB)
                  </label>
                </div>
              ))}

              {/* conditional เมื่อเลือกสินค้าเสริมทั้งหมด ให้แสดง discount */}

              {isDiscount && (
                <span className="text-success d-block">
                  (20% Discounted)
                </span>
              )}
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            <div>
              Total Payment : {totalPayment.toLocaleString()} THB
            </div>
          </div>

          <div className="modal-footer">
            <div>
              <input
                className="me-2 form-check-input"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />

              I agree to the terms and conditions
            </div>

            <button
              type="button"
              className="btn btn-success my-2"
              disabled={!agree}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}