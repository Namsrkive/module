export default function CompanyTestCard({ company, focus, openModal }) {
  return (
    <div className="test-card company" onClick={() => openModal(company)}>
      <h3>{company}</h3>
      <p>{focus}</p>
    </div>
  );
}