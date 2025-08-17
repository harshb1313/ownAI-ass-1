import React from 'react'
import { useState } from 'react'
import './App.css'



function App() {
  const [formData, setFormData] = useState({
    clientName: "",
    poType: "",
    poNumber: "",
    receivedOn: "",
    receivedFromName: "",
    receivedFromEmail: "",
    poStartDate: "",
    poEndDate: "",
    budget: "",
    currency: "USD",
    reqs: [
      {
        jobTitle: "",
        jobId: "",
        talents: [],
      },
    ],
  });

  const [submitted, setSubmitted] = useState(false);

  // Sample data (replace with API later)
  const jobOptions = [
    { id: "OWNAT_234", title: "Application Development", talents: ["Monika Goyal Test", "Shaili Khatri"] },
    { id: "CLK_12880", title: "Business Administrator", talents: ["Ravi Kumar", "Anita Sharma"] },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReqChange = (index, field, value) => {
    const newReqs = [...formData.reqs];
    newReqs[index][field] = value;

    // Auto-fill jobId when jobTitle selected
    if (field === "jobTitle") {
      const selectedJob = jobOptions.find((job) => job.title === value);
      newReqs[index].jobId = selectedJob ? selectedJob.id : "";
      newReqs[index].talents = selectedJob
        ? selectedJob.talents.map((t) => ({
          name: t,
          selected: false,
          contractDuration: "",
          billRate: "",
          stdTime: "",
          overtime: "",
          currency: "USD",
        }))
        : [];
    }

    setFormData({ ...formData, reqs: newReqs });
  };

  const handleTalentToggle = (reqIndex, talentIndex) => {
    const newReqs = [...formData.reqs];
    newReqs[reqIndex].talents[talentIndex].selected =
      !newReqs[reqIndex].talents[talentIndex].selected;
    setFormData({ ...formData, reqs: newReqs });
  };

  const handleTalentField = (reqIndex, talentIndex, field, value) => {
    const newReqs = [...formData.reqs];
    newReqs[reqIndex].talents[talentIndex][field] = value;
    setFormData({ ...formData, reqs: newReqs });
  };

  const addReq = () => {
    setFormData({
      ...formData,
      reqs: [...formData.reqs, { jobTitle: "", jobId: "", talents: [] }],
    });
  };

  const resetForm = () => {
    setFormData({
      clientName: "",
      poType: "",
      poNumber: "",
      receivedOn: "",
      receivedFromName: "",
      receivedFromEmail: "",
      poStartDate: "",
      poEndDate: "",
      budget: "",
      currency: "USD",
      reqs: [
        {
          jobTitle: "",
          jobId: "",
          talents: [],
        },
      ],
    });
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.clientName || !formData.poType || !formData.poNumber) {
      alert("Please fill all mandatory fields.");
      return;
    }

    if (formData.poEndDate < formData.poStartDate) {
      alert("End date cannot be before Start date.");
      return;
    }

    if (formData.budget.length > 5) {
      alert("Budget must be max 5 digits.");
      return;
    }

    if (formData.poType === "Individual PO") {
      const selectedTalents = formData.reqs.flatMap((r) =>
        r.talents.filter((t) => t.selected)
      );
      if (selectedTalents.length !== 1) {
        alert("Individual PO must have exactly 1 talent.");
        return;
      }
    }

    if (formData.poType === "Group PO") {
      const selectedTalents = formData.reqs.flatMap((r) =>
        r.talents.filter((t) => t.selected)
      );
      if (selectedTalents.length < 2) {
        alert("Group PO must have at least 2 talents.");
        return;
      }
    }

    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className='p-3'>
      <h2 className="text-2xl font-bold mb-4">Purchase Order | New</h2>
      <form onSubmit={handleSubmit}>

        {/* Purchase Order Details */}
        {/* Row 1: Client Name, PO Type, PO Number, Received On */}
        {/* Purchase Order Details */}
<div className="grid grid-cols-4 gap-6 mb-6">
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Client Name <span className="text-red-500">*</span>
    </label>
    <input
      className="mt-1 w-full border p-2 rounded"
      name="clientName"
      value={formData.clientName}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Purchase Order Type <span className="text-red-500">*</span>
    </label>
    <select
      className="mt-1 w-full border p-2 rounded"
      name="poType"
      value={formData.poType}
      onChange={handleChange}
    >
      <option value="">Select</option>
      <option>Group PO</option>
      <option>Individual PO</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Purchase Order No <span className="text-red-500">*</span>
    </label>
    <input
      className="mt-1 w-full border p-2 rounded"
      name="poNumber"
      value={formData.poNumber}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Received On <span className="text-red-500">*</span>
    </label>
    <input
      type="date"
      className="mt-1 w-full border p-2 rounded"
      name="receivedOn"
      value={formData.receivedOn}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Received From (Name) <span className="text-red-500">*</span>
    </label>
    <input
      className="mt-1 w-full border p-2 rounded"
      name="receivedFromName"
      value={formData.receivedFromName}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Received From (Email) <span className="text-red-500">*</span>
    </label>
    <input
      type="email"
      className="mt-1 w-full border p-2 rounded"
      name="receivedFromEmail"
      value={formData.receivedFromEmail}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      PO Start Date <span className="text-red-500">*</span>
    </label>
    <input
      type="date"
      className="mt-1 w-full border p-2 rounded"
      name="poStartDate"
      value={formData.poStartDate}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      PO End Date <span className="text-red-500">*</span>
    </label>
    <input
      type="date"
      className="mt-1 w-full border p-2 rounded"
      name="poEndDate"
      value={formData.poEndDate}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Budget <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      className="mt-1 w-full border p-2 rounded"
      name="budget"
      value={formData.budget}
      onChange={handleChange}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      Currency <span className="text-red-500">*</span>
    </label>
    <select
      className="mt-1 w-full border p-2 rounded"
      name="currency"
      value={formData.currency}
      onChange={handleChange}
    >
      <option>USD</option>
      <option>INR</option>
      <option>EUR</option>
    </select>
  </div>
</div>



        {/* REQ Sections */}
        {formData.reqs.map((req, reqIndex) => (
          <div key={reqIndex} className="border rounded p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <select
                className="border p-2 rounded"
                value={req.jobTitle}
                onChange={(e) =>
                  handleReqChange(reqIndex, "jobTitle", e.target.value)
                }
              >
                <option value="">Select Job Title *</option>
                {jobOptions.map((job) => (
                  <option key={job.id}>{job.title}</option>
                ))}
              </select>
              <input
                className="border p-2 rounded"
                value={req.jobId}
                placeholder="REQ ID"
                disabled
              />
            </div>

            {/* Talents */}
            <div className="mt-4">
              {req.talents.map((talent, talentIndex) => (
                <div key={talentIndex} className="border rounded p-2 mb-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={talent.selected}
                      onChange={() => handleTalentToggle(reqIndex, talentIndex)}
                    />
                    <span>{talent.name}</span>
                  </label>

                  {talent.selected && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      <input
                        className="border p-2 rounded"
                        placeholder="Contract Duration (Months)"
                        value={talent.contractDuration}
                        onChange={(e) =>
                          handleTalentField(
                            reqIndex,
                            talentIndex,
                            "contractDuration",
                            e.target.value
                          )
                        }
                      />
                      <input
                        className="border p-2 rounded"
                        placeholder="Bill Rate (/hr)"
                        value={talent.billRate}
                        onChange={(e) =>
                          handleTalentField(
                            reqIndex,
                            talentIndex,
                            "billRate",
                            e.target.value
                          )
                        }
                      />
                      <input
                        className="border p-2 rounded"
                        placeholder="Standard Time BR"
                        value={talent.stdTime}
                        onChange={(e) =>
                          handleTalentField(
                            reqIndex,
                            talentIndex,
                            "stdTime",
                            e.target.value
                          )
                        }
                      />
                      <input
                        className="border p-2 rounded"
                        placeholder="Overtime BR"
                        value={talent.overtime}
                        onChange={(e) =>
                          handleTalentField(
                            reqIndex,
                            talentIndex,
                            "overtime",
                            e.target.value
                          )
                        }
                      />
                      <select
                        className="border p-2 rounded"
                        value={talent.currency}
                        onChange={(e) =>
                          handleTalentField(
                            reqIndex,
                            talentIndex,
                            "currency",
                            e.target.value
                          )
                        }
                      >
                        <option>USD</option>
                        <option>INR</option>
                        <option>EUR</option>
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add REQ button (only for Group PO) */}
        {formData.poType === "Group PO" && (
          <button
            type="button"
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={addReq}
          >
            + Add Another
          </button>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="px-4 py-2 border rounded"
            onClick={resetForm}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>

      {/* Disabled view after submit */}
      {submitted && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Submitted Data</h3>
          <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App
