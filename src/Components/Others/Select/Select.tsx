import { useEffect, useState } from 'react';
import './Select.css';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { appliance, gadget } from '../../../Utils/HelperFn';

const Select = ({ darkTheme, setType }: any) => {
  const [color, setColor] = useState<any>(light_colors);
  const [selected, setSelected] = useState("null");

  const handleChange = (event:any) => {
    setSelected(event?.target?.value);
  };

  useEffect(() => {
      darkTheme ? setColor(dark_colors) : setColor(light_colors);
  }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
   setType(selected)
}, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
       <div className='select-form'>
        <select value={selected} onChange={handleChange} name="device" id="device" size={1}  style={{ backgroundColor: color?.element, color: color?.text}}>
        <option value="null" disabled selected hidden>Choose type...</option>
        <optgroup label="Gadget">
            {gadget?.map(option => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
  </optgroup>
  <optgroup label="Appliance">
        {appliance?.map(option => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
  </optgroup>
</select>
       </div>
    );
};

export default Select;