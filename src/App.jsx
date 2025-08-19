import React, { useState } from 'react';

function App() {
  // Main form data
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

  // Sample job options
  const jobOptions = [
    { 
      id: "OWNAT_234", 
      title: "Application Development", 
      talents: ["Monika Goyal Test", "Shaili Khatri"] 
    },
    { 
      id: "CLK_12880", 
      title: "Business Administrator", 
      talents: ["Ravi Kumar", "Anita Sharma"] 
    },
  ];

  // Handle basic input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle job selection in REQ section
  const handleJobSelection = (reqIndex, field, value) => {
    const newReqs = [...formData.reqs];
    newReqs[reqIndex][field] = value;

    // When job title is selected, auto-fill job ID and talents
    if (field === "jobTitle") {
      const selectedJob = jobOptions.find(job => job.title === value);
      if (selectedJob) {
        newReqs[reqIndex].jobId = selectedJob.id;
        newReqs[reqIndex].talents = selectedJob.talents.map(talentName => ({
          name: talentName,
          selected: false,
          contractDuration: "",
          billRate: "",
          stdTime: "",
          overtime: "",
          currency: "USD",
        }));
      } else {
        newReqs[reqIndex].jobId = "";
        newReqs[reqIndex].talents = [];
      }
    }

    setFormData(prev => ({
      ...prev,
      reqs: newReqs
    }));
  };

  // Handle talent checkbox toggle
  const toggleTalent = (reqIndex, talentIndex) => {
    const newReqs = [...formData.reqs];
    newReqs[reqIndex].talents[talentIndex].selected = 
      !newReqs[reqIndex].talents[talentIndex].selected;
    
    setFormData(prev => ({
      ...prev,
      reqs: newReqs
    }));
  };

  // Handle talent detail changes
  const updateTalentDetails = (reqIndex, talentIndex, field, value) => {
    const newReqs = [...formData.reqs];
    newReqs[reqIndex].talents[talentIndex][field] = value;
    
    setFormData(prev => ({
      ...prev,
      reqs: newReqs
    }));
  };

  // Add new REQ section
  const addNewReq = () => {
    setFormData(prev => ({
      ...prev,
      reqs: [...prev.reqs, { jobTitle: "", jobId: "", talents: [] }]
    }));
  };

  // Remove REQ section
  const removeReq = (reqIndex) => {
    if (formData.reqs.length > 1) {
      setFormData(prev => ({
        ...prev,
        reqs: prev.reqs.filter((_, index) => index !== reqIndex)
      }));
    }
  };

  // Reset entire form
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
      reqs: [{ jobTitle: "", jobId: "", talents: [] }],
    });
    setSubmitted(false);
  };

  // Form validation and submission
  const handleSubmit = () => {
    // Check required fields
    if (!formData.clientName || !formData.poType || !formData.poNumber) {
      alert("Please fill all required fields marked with *");
      return;
    }

    // Validate dates
    if (formData.poEndDate < formData.poStartDate) {
      alert("End date cannot be before start date");
      return;
    }

    // Validate budget length
    if (formData.budget && formData.budget.length > 5) {
      alert("Budget must be maximum 5 digits");
      return;
    }

    // Count selected talents
    const selectedTalents = formData.reqs
      .flatMap(req => req.talents)
      .filter(talent => talent.selected);

    // Validate based on PO type
    if (formData.poType === "Individual PO" && selectedTalents.length !== 1) {
      alert("Individual PO must have exactly 1 talent selected");
      return;
    }

    if (formData.poType === "Group PO" && selectedTalents.length < 2) {
      alert("Group PO must have at least 2 talents selected");
      return;
    }

    // All validations passed
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
          crossOrigin="anonymous"
        />
        <div className="container-fluid" style={{backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px'}}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-success">✅ Purchase Order Submitted Successfully!</h2>
            <button 
              type="button" 
              className="btn btn-outline-primary"
              onClick={() => setSubmitted(false)}
            >
              Edit Form
            </button>
          </div>
          <div className="bg-white rounded shadow-sm p-4">
            {/* Display submitted data here - simplified view */}
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
        crossOrigin="anonymous"
      />
      <div className="container-fluid" style={{backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px'}}>
        <div className="bg-white rounded shadow-sm p-4">
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <button className="btn btn-link p-0 me-2" style={{textDecoration: 'none', color: '#6c757d'}}>
              <span style={{fontSize: '18px'}}>←</span>
            </button>
            <h4 className="mb-0">Purchase Order | New</h4>
          </div>

          {/* First Row - 4 columns */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">
                Client Name <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
              >
                <option value="">Collabera - Collabera Inc</option>
                <option value="Collabera - Collabera Inc">Collabera - Collabera Inc</option>
                <option value="Other Client">Other Client</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">
                Purchase Order Type <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="poType"
                value={formData.poType}
                onChange={handleInputChange}
              >
                <option value="">Group PO</option>
                <option value="Group PO">Group PO</option>
                <option value="Individual PO">Individual PO</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">
                Purchase Order No <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="poNumber"
                value={formData.poNumber}
                onChange={handleInputChange}
                placeholder="PO Number"
                style={{backgroundColor: '#f8f9fa'}}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">
                Received On <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                name="receivedOn"
                value={formData.receivedOn}
                onChange={handleInputChange}
                placeholder="Received On"
                style={{backgroundColor: '#f8f9fa'}}
              />
            </div>
          </div>

          {/* Second Row - 2 columns for Received From */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">
                Received From <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="receivedFromName"
                value={formData.receivedFromName}
                onChange={handleInputChange}
                placeholder="Received From Name"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" style={{visibility: 'hidden'}}>
                Hidden Label
              </label>
              <input
                type="email"
                className="form-control"
                name="receivedFromEmail"
                value={formData.receivedFromEmail}
                onChange={handleInputChange}
                placeholder="Received From Email ID"
              />
            </div>
          </div>

          {/* Third Row - 4 columns for dates and budget */}
          <div className="row mb-4">
            <div className="col-md-3">
              <label className="form-label">
                PO Start Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                name="poStartDate"
                value={formData.poStartDate}
                onChange={handleInputChange}
                placeholder="Start Date"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">
                PO End Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                name="poEndDate"
                value={formData.poEndDate}
                onChange={handleInputChange}
                placeholder="End Date"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">
                Budget <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Budget"
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">
                Currency <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
              >
                <option value="USD">USD - Dollars ($)</option>
                <option value="INR">INR - Rupees (₹)</option>
                <option value="EUR">EUR - Euros (€)</option>
              </select>
            </div>
          </div>

          {/* Talent Detail Section */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Talent Detail</h5>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={addNewReq}
              disabled={formData.poType === "Individual PO"}
            >
              + Add Another
            </button>
          </div>

          {/* Job Requirements Sections */}
          {formData.reqs.map((req, reqIndex) => (
            <div key={reqIndex} className="border rounded p-3 mb-3" style={{backgroundColor: '#fafafa'}}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Job Title/REQ Name <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={req.jobTitle}
                    onChange={(e) => handleJobSelection(reqIndex, "jobTitle", e.target.value)}
                  >
                    <option value="">Application Development</option>
                    {jobOptions.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-5">
                  <label className="form-label">
                    Job ID/REQ ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={req.jobId}
                    placeholder="OWNAT_234"
                    disabled
                    style={{backgroundColor: '#e9ecef'}}
                  />
                </div>

                <div className="col-md-1 d-flex align-items-end">
                  {formData.reqs.length > 1 && (
                    <div className="d-flex flex-column">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm mb-1"
                        onClick={() => removeReq(reqIndex)}
                        style={{fontSize: '12px', padding: '2px 8px'}}
                      >
                        🗑
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={addNewReq}
                        style={{fontSize: '12px', padding: '2px 8px'}}
                      >
                        ➕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Available Talents */}
              {req.talents.length > 0 && (
                <div>
                  {req.talents.map((talent, talentIndex) => (
                    <div key={talentIndex} className="border rounded p-3 mb-2 bg-white">
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={talent.selected}
                          onChange={() => toggleTalent(reqIndex, talentIndex)}
                        />
                        <label className="form-check-label fw-bold">
                          {talent.name}
                        </label>
                      </div>

                      {/* Show talent details only when selected */}
                      {talent.selected && (
                        <>
                          <div className="row mb-2">
                            <div className="col-md-3">
                              <label className="form-label">Contract Duration</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={talent.contractDuration}
                                  onChange={(e) => updateTalentDetails(reqIndex, talentIndex, "contractDuration", e.target.value)}
                                  placeholder="Contract Duration"
                                />
                                <span className="input-group-text">Months</span>
                              </div>
                            </div>
                            
                            <div className="col-md-2">
                              <label className="form-label">Bill Rate</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={talent.billRate}
                                  onChange={(e) => updateTalentDetails(reqIndex, talentIndex, "billRate", e.target.value)}
                                  placeholder="Bill Rate"
                                />
                                <span className="input-group-text">/hr</span>
                              </div>
                            </div>
                            
                            <div className="col-md-2">
                              <label className="form-label">Currency</label>
                              <select
                                className="form-select"
                                value={talent.currency}
                                onChange={(e) => updateTalentDetails(reqIndex, talentIndex, "currency", e.target.value)}
                              >
                                <option value="USD">USD - Dollars ($)</option>
                                <option value="INR">INR - Rupees (₹)</option>
                                <option value="EUR">EUR - Euros (€)</option>
                              </select>
                            </div>

                            <div className="col-md-2">
                              <label className="form-label">Standard Time BR</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={talent.stdTime}
                                  onChange={(e) => updateTalentDetails(reqIndex, talentIndex, "stdTime", e.target.value)}
                                  placeholder="Std Time BR"
                                />
                                <span className="input-group-text">/hr</span>
                              </div>
                            </div>

                            <div className="col-md-1">
                              <label className="form-label">Currency</label>
                              <select
                                className="form-select"
                                value={talent.currency}
                                onChange={(e) => updateTalentDetails(reqIndex, talentIndex, "currency", e.target.value)}
                              >
                                <option value="USD">USD - Dollars ($)</option>
                                <option value="INR">INR - Rupees (₹)</option>
                                <option value="EUR">EUR - Euros (€)</option>
                              </select>
                            </div>

                            <div className="col-md-2">
                              <label className="form-label">Over Time BR</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={talent.overtime}
                                  onChange={(e) => updateTalentDetails(reqIndex, talentIndex, "overtime", e.target.value)}
                                  placeholder="Over Time BR"
                                />
                                <span className="input-group-text">/hr</span>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">Currency</label>
                              <select
                                className="form-select"
                                value={talent.currency}
                                onChange={(e) => updateTalentDetails(reqIndex, talentIndex, "currency", e.target.value)}
                              >
                                <option value="USD">USD - Dollars ($)</option>
                                <option value="INR">INR - Rupees (₹)</option>
                                <option value="EUR">EUR - Euros (€)</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;