import './InformationBackdropModelContent.css';

const InformationBackdropModelContent = (props: any) => {
    return (
        <div
            className="informationBackdropModelContent"
            style={{ background: '#2E3438' }}
        >
            <p>
                {props.content}{' '}
                <span style={{ color: 'orangered' }}>{props.value}</span>.
            </p>
        </div>
    );
};

export default InformationBackdropModelContent;
