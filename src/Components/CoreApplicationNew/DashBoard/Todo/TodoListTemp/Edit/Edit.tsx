import { useEffect, useState } from 'react';
import './Edit.css';
import {
    dark_colors,
    light_colors,
} from '../../../../../../Data/ColorConstant';
import Button from '../../../../../Others/CustomButton/Button';

const Edit = ({ darkTheme }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const [edit, setEdit] = useState<boolean>(false);
    const toggleEdit = (val: boolean) => {
        setEdit(val);
    };
    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="todo-edit" style={{ backgroundColor: color?.element }}>
            <section style={{ borderBottom: `1px solid ${color?.outer}` }}>
                <span>
                    <Button
                        label="Edit"
                        textCol={color.text}
                        backCol={color.button}
                        width="100px"
                        fn={() => toggleEdit(true)}
                        status={false}
                        border={color.element}
                    />
                </span>
                <span>
                    <Button
                        label="Schedule"
                        textCol={color.text}
                        backCol={color.button}
                        width="100px"
                        fn={() => toggleEdit(false)}
                        status={false}
                        border={color.element}
                    />
                </span>
            </section>
            <section>{edit ? <div>edit</div> : <div>schedule</div>}</section>
        </div>
    );
};

export default Edit;
