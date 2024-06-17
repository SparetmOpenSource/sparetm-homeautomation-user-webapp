//import { useOutletContext } from 'react-router-dom';
import './GettingStarted.css';
import { page_4_socialContact_list } from '../../../../Data/HomePageConstant';


const GettingStarted = () => {
    //const data: any = useOutletContext();

    const Learn_List = [
        {
            id: 1,
            label: 'How to download and setup Arduino IDE for Node MCU(esp8266)',
        },
        {
            id: 2,
            label: 'How to do basic setup in your esp8266 devices',
        },
        {
            id: 3,
            label: 'How to write code in esp8266 for your specific devices',
        },
        {
            id: 4,
            label: 'Some code examples to automate your Home',
        },
    ];

    return (
        <div className="gettingStarted">
            <h1>Quick Start</h1>
            <p>
                Welcome to the Open Bridge documentation! This page will give
                you an introduction to setup your Home.
            </p>
            {/* <p>{data}</p> */}
            <section className="gettingStarted_info_content">
                <h2>You will learn</h2>
                <ul>
                    {Learn_List.map((item: any) => (
                        <li key={item.id}>{item.label}</li>
                    ))}
                </ul>
            </section>
            <p>
                Please do not hesitate to let us know if we can be of any
                further assistance. Please click{' '}
                <span>
                    <a
                        href={page_4_socialContact_list[2].href}
                        target="_blank"
                        rel="noreferrer"
                    >
                        here
                    </a>
                </span>{' '}
                to connect.
            </p>
        </div>
    );
};

export default GettingStarted;
