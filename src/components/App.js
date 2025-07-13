import React, { useState } from 'react';
import TemplateGallery from './TemplateGallery';
import CardEditor from './CardEditor';
import './App.css';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="App">
      <h1>Wedding Thank You Card Creator</h1>
      {selectedTemplate ? (
        <CardEditor template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />
      ) : (
        <TemplateGallery onSelectTemplate={setSelectedTemplate} />
      )}
    </div>
  );
}

export default App;
