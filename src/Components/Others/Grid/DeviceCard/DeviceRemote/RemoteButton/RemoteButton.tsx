import Button from '../../../../CustomButton/Button';

/**
 * RemoteButton Component
 * 
 * A reusable button component for device remote controls (AC and Fan).
 * 
 * NOTE: This component intentionally uses inline-only styling (no separate CSS file).
 * All styling is handled through props passed to the underlying Button component,
 * allowing for dynamic color changes based on device state (active/inactive/disabled).
 * This approach provides better flexibility for remote control buttons that need
 * to change appearance based on real-time device status.
 */

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
