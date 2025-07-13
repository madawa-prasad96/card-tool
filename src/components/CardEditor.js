import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const CardEditor = ({ template, onBack }) => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 700,
      backgroundColor: 'white',
    });
    fabricCanvas.current = canvas;

    // Add template name
    const text = new fabric.Textbox(template.name, {
      left: 50,
      top: 50,
      width: 400,
      fontSize: 40,
      textAlign: 'center',
    });
    canvas.add(text);


    // Clean up on unmount
    return () => {
      canvas.dispose();
    };
  }, [template]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (f) => {
      fabric.Image.fromURL(f.target.result, (img) => {
        img.scaleToWidth(400);
        fabricCanvas.current.add(img);
        fabricCanvas.current.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  const [activeObject, setActiveObject] = useState(null);

  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.on('selection:created', (e) => {
        setActiveObject(e.target);
      });
      fabricCanvas.current.on('selection:updated', (e) => {
        setActiveObject(e.target);
      });
      fabricCanvas.current.on('selection:cleared', () => {
        setActiveObject(null);
      });
    }
  }, [fabricCanvas.current]);

  const addText = () => {
    const text = new fabric.Textbox('Your Text Here', {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 20,
    });
    fabricCanvas.current.add(text);
    fabricCanvas.current.setActiveObject(text);
  };

  const updateTextColor = (color) => {
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set('fill', color);
      fabricCanvas.current.renderAll();
    }
  };

  const updateFontSize = (size) => {
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set('fontSize', parseInt(size, 10));
      fabricCanvas.current.renderAll();
    }
  };

  const updateFontFamily = (font) => {
    if (activeObject && activeObject.type === 'textbox') {
      activeObject.set('fontFamily', font);
      fabricCanvas.current.renderAll();
    }
  };

  const exportAsPNG = () => {
    const dataURL = fabricCanvas.current.toDataURL({
      format: 'png',
      quality: 1,
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${template.name}-card.png`;
    link.click();
  };

  return (
    <div>
      <h2>Editing {template.name}</h2>
      <div className="controls">
        <button onClick={onBack}>Back to Templates</button>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={addText}>Add Text</button>
        <button onClick={exportAsPNG}>Export as PNG</button>
      </div>
      {activeObject && activeObject.type === 'textbox' && (
        <div className="controls">
          <label>Color:</label>
          <input type="color" value={activeObject.fill} onChange={(e) => updateTextColor(e.target.value)} />
          <label>Font Size:</label>
          <input type="number" value={activeObject.fontSize} onChange={(e) => updateFontSize(e.target.value)} />
          <label>Font Family:</label>
          <select value={activeObject.fontFamily} onChange={(e) => updateFontFamily(e.target.value)}>
            <option>Arial</option>
            <option>Courier</option>
            <option>Georgia</option>
            <option>Times New Roman</option>
            <option>Verdana</option>
          </select>
        </div>
      )}
      <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }} />
    </div>
  );
};

export default CardEditor;
