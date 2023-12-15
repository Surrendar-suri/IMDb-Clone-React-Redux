export const InputField = ({ label, name, formik }) => (
  <div className="form-group mb-2">
    <label>{label}:</label>
    <input
      type="text"
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`form-control ${formik.touched[name] && formik.errors[name] ? 'is-invalid' : ''}`}
    />
    {formik.touched[name] && formik.errors[name] && (
      <div className="invalid-feedback">{formik.errors[name]}</div>
    )}
  </div>
);

export const InputGroupField = ({ label, nameHours, nameMinutes, formik }) => (
  <div className="form-group input-group mb-2">
    <label style={{ width: "100%" }}>{label}:</label>
    <input
      type="text"
      name={nameHours}
      value={formik.values[nameHours]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`form-control ${formik.touched[nameHours] && formik.errors[nameHours] ? 'is-invalid' : ''}`}
    />
    <span className="input-group-text">Hrs</span>

    <input
      type="text"
      name={nameMinutes}
      value={formik.values[nameMinutes]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`form-control ${formik.touched[nameMinutes] && formik.errors[nameMinutes] ? 'is-invalid' : ''}`}
    />
    <span className="input-group-text">Mins</span>
    {((formik.touched[nameHours] && formik.errors[nameHours]) || (formik.touched[nameMinutes] && formik.errors[nameMinutes])) && (
      <div className="invalid-feedback">{formik.errors[nameHours] || formik.errors[nameMinutes]}</div>
    )}
  </div>
);

export const FileInputField = ({ label, name, formik, handleImageUpload }) => (
  <div className="form-group">
    <label>{label}:</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        formik.handleChange(e);
        handleImageUpload(e);
      }}
      onBlur={formik.handleBlur}
      className={`form-control ${formik.touched[name] && formik.errors[name] ? 'is-invalid' : ''}`}
    />
    {formik.touched[name] && formik.errors[name] && (
      <div className="invalid-feedback">{formik.errors[name]}</div>
    )}
    {formik.values[name] && (
      <img src={formik.values[name]} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
    )}
  </div>
);

