import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const CardEditor = ({ template, onBack }) => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    if (!fabricCanvas.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      fabricCanvas.current = canvas;
    }
    const canvas = fabricCanvas.current;
    canvas.setWidth(template.width);
    canvas.setHeight(template.height);
    canvas.clear();

    fabric.Image.fromURL(template.background, (img) => {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
      });
    });

    template.placeholders.forEach((p) => {
      const placeholder = new fabric.Rect({
        left: p.x,
        top: p.y,
        width: p.width,
        height: p.height,
        fill: '#eee',
        stroke: '#ccc',
        strokeDashArray: [5, 5],
        selectable: false,
        data: { id: p.id },
      });
      canvas.add(placeholder);
    });

    const text = new fabric.Textbox('Thank You!', {
      left: 50,
      top: 550,
      width: 400,
      fontSize: 40,
      textAlign: 'center',
      fontFamily: 'Georgia',
    });
    canvas.add(text);
  }, [template]);

  useEffect(() => {
    return () => {
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
        fabricCanvas.current = null;
      }
    };
  }, []);

  const fileInputRef = useRef(null);

  const [selectedPlaceholder, setSelectedPlaceholder] = useState(null);

  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.on('mouse:down', (e) => {
        if (e.target && e.target.data && e.target.data.id) {
          setSelectedPlaceholder(e.target.data.id);
          fileInputRef.current.click();
        }
      });
    }
  }, [fabricCanvas.current]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (f) => {
      fabric.Image.fromURL(f.target.result, (img) => {
        const placeholder = fabricCanvas.current.getObjects().find(
          (obj) => obj.data && obj.data.id === selectedPlaceholder
        );

        if (placeholder) {
          img.scaleToWidth(placeholder.width);
          img.set({
            left: placeholder.left,
            top: placeholder.top,
            clipTo: function (ctx) {
              ctx.rect(placeholder.left, placeholder.top, placeholder.width, placeholder.height);
            }
          });
          fabricCanvas.current.add(img);
          fabricCanvas.current.remove(placeholder);
          fabricCanvas.current.setActiveObject(img);
          fabricCanvas.current.renderAll();
        } else {
          fabricCanvas.current.add(img);
        }
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
      editable: true,
    });
    fabricCanvas.current.add(text);
    fabricCanvas.current.setActiveObject(text);
    fabricCanvas.current.renderAll();
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

  return (
    <div className="card-editor-container">
      <div className="editor-controls">
        <h2>Editing {template.name}</h2>
        <div className="controls">
          <button onClick={onBack}>Back to Templates</button>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} ref={fileInputRef} />
          <button onClick={() => fileInputRef.current.click()}>Add Image</button>
          <button onClick={addText}>Add Text</button>
        </div>
        {activeObject && activeObject.type === 'image' && (
          <div className="controls">
            <label>Zoom:</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={activeObject.scaleX}
              onChange={(e) => {
                activeObject.scale(parseFloat(e.target.value)).setCoords();
                fabricCanvas.current.renderAll();
              }}
            />
          </div>
        )}
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
              <option>Dancing Script</option>
              <option>Great Vibes</option>
              <option>Lobster</option>
              <option>Pacifico</option>
            </select>
          </div>
        )}
      </div>
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default CardEditor;
