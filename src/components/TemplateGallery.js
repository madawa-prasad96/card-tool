import React from 'react';
import templates from '../templates/TemplateData';
import './TemplateGallery.css';

const TemplateGallery = ({ onSelectTemplate }) => {
  return (
    <div className="template-gallery">
      <h2>Choose a Template</h2>
      <div className="template-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template-item"
            onClick={() => onSelectTemplate(template)}
          >
            <img src={template.background} alt={template.name} />
            <p>{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
