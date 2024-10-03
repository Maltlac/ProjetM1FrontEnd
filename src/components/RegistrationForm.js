import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
    ville: '',
    codePostal: ''
  });

  const [errors, setErrors] = useState({});
  const [inscrits, setInscrits] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    fetchInscrits();
  }, []);

  const fetchInscrits = async () => {
    const response = await axios.get('http://localhost:3000/inscrits');
    setInscrits(response.data);
  };

  const validate = () => {
    const newErrors = {};
    // Ajoutez ici les règles de validation
    if (!formData.nom.match(/^[a-zA-ZÀ-ÿ '-]+$/)) {
      newErrors.nom = 'Nom invalide';
    }
    if (!formData.prenom.match(/^[a-zA-ZÀ-ÿ '-]+$/)) {
      newErrors.prenom = 'Prénom invalide';
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Email invalide';
    }
    const age = new Date().getFullYear() - new Date(formData.dateNaissance).getFullYear();
    if (age < 18) {
      newErrors.dateNaissance = 'Vous devez avoir au moins 18 ans';
    }
    if (!formData.codePostal.match(/^\d{5}$/)) {
      newErrors.codePostal = 'Code postal invalide';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      await axios.post('http://localhost:3000/inscription', formData);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        dateNaissance: '',
        ville: '',
        codePostal: ''
      });
      fetchInscrits();
      alert('Inscription réussie');
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    const isFormValid = Object.values(formData).every(field => field !== '');
    setIsButtonDisabled(!isFormValid);
  }, [formData]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" />
        {errors.nom && <span>{errors.nom}</span>}
        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" />
        {errors.prenom && <span>{errors.prenom}</span>}
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        {errors.email && <span>{errors.email}</span>}
        <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} placeholder="Date de naissance" />
        {errors.dateNaissance && <span>{errors.dateNaissance}</span>}
        <input type="text" name="ville" value={formData.ville} onChange={handleChange} placeholder="Ville" />
        {errors.ville && <span>{errors.ville}</span>}
        <input type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} placeholder="Code postal" />
        {errors.codePostal && <span>{errors.codePostal}</span>}
        <button type="submit" disabled={isButtonDisabled}>Sauvegarder</button>
      </form>
      <h2>Liste des inscrits</h2>
      <ul>
        {inscrits.map(inscrit => (
          <li key={inscrit._id}>{inscrit.nom} {inscrit.prenom} - {inscrit.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
