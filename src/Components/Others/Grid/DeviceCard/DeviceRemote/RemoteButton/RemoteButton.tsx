import Button from '../../../../CustomButton/Button';

interface RemoteButtonProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
    isDisabled: boolean;
    width?: string;
    activeColor?: string;
    inactiveColor?: string;
}

const RemoteButton: React.FC<RemoteButtonProps> = ({
    label,
    onClick,
    isActive,
    isDisabled,
    width = '80px',
    activeColor = 'lightgreen',
    inactiveColor = '#e2ff00',
}) => {
    const getBackgroundColor = () => {
        if (isDisabled) return 'grey';
        return isActive ? activeColor : inactiveColor;
    };

    return (
        <Button
            label={label}
            textCol="black"
            backCol={getBackgroundColor()}
            width={width}
            fn={onClick}
        />
    );
};

export default RemoteButton;
