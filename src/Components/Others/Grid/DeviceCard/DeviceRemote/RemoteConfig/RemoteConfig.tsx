import { useForm } from 'react-hook-form';
import { MdOutlineElectricalServices } from 'react-icons/md';
import { copyText } from '../../../../../../Utils/HelperFn';
import Button from '../../../../CustomButton/Button';
import './RemoteConfig.css';

interface RemoteConfigProps {
    deviceType: 'ac' | 'fan';
    onSave: (codes: string) => void;
    preConfiguredCodes: string;
    codeCount: number;
}

const RemoteConfig: React.FC<RemoteConfigProps> = ({
    deviceType,
    onSave,
    preConfiguredCodes,
    codeCount,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onBlur' });

    const onSubmit = (data: any) => {
        onSave(data.deviceDataStore);
        reset();
    };

    return (
        <section className="remoteConfig">
            <p>
                You can capture infrared{' '}
                <span style={{ color: 'orangered' }}>codes</span> from a
                handheld IR remote to create{' '}
                <span style={{ color: 'orangered' }}>custom</span> remote for
                operating IR-controlled devices.
            </p>
            <p>
                To configure your custom remote, you can follow{' '}
                <span style={{ color: 'orangered' }}>documentation</span> in{' '}
                <MdOutlineElectricalServices /> connection section.
            </p>
            <p>
                For instance, if you are using{' '}
                <i>
                    <b style={{ color: 'orangered' }}>
                        {deviceType.toUpperCase() === 'AC' ? 'LG AC' : 'ATOMBERG FAN'}
                    </b>
                </i>
                , you can copy the below code and save to your device.
            </p>
            <p
                onClick={() => copyText(preConfiguredCodes)}
                className="textCopyLink"
            >
                <em>Click here to copy the code</em>
            </p>
            <span className="remoteConfig_code_input">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder={`Enter ${codeCount} codes separated by comma...`}
                        style={{
                            background: '#1f2123',
                            color: 'lavender',
                        }}
                        {...register('deviceDataStore', {
                            required: 'IR Codes are required',
                        })}
                    />
                    {errors.deviceDataStore && (
                        <p className="remoteConfig_code_input_form_error">
                            {(errors.deviceDataStore as any)?.message}
                        </p>
                    )}
                    <Button
                        label="save"
                        textCol="black"
                        backCol="lightgreen"
                        width="80px"
                    />
                </form>
            </span>
            <p>
                <mark>
                    ...All the {codeCount === 6 ? 'six' : 'seven'} codes will be
                    mapped to the buttons respectively...
                </mark>
            </p>
        </section>
    );
};

export default RemoteConfig;
