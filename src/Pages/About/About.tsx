import Tree from '../../Components/Others/Graph/Tree';
import './About.css';

const About = () => {
    const dataa = {
        name: 'App',
        children: [
            {
                name: 'GlobalRoutes',
                children: [
                    {
                        name: 'stack',
                        children: [
                            {
                                name: 'cchart',
                                loc: 101673,
                            },
                        ],
                    },
                    {
                        name: 'ppie',
                        children: [
                            {
                                name: 'chart',
                                children: [
                                    {
                                        name: 'pie',
                                        children: [
                                            {
                                                name: 'outline',
                                                loc: 127852,
                                            },
                                        ],
                                    },
                                    {
                                        name: 'donut',
                                        loc: 48672,
                                    },
                                    {
                                        name: 'gauge',
                                        loc: 740,
                                    },
                                ],
                            },
                            {
                                name: 'legends',
                                loc: 148817,
                            },
                        ],
                    },
                ],
            },
            {
                name: 'GlobalRoutePages',
                // children: [
                //     {
                //         name: 'rgb',
                //         loc: 65921,
                //     },
                //     {
                //         name: 'hsl',
                //         loc: 85141,
                //     },
                // ],
            },
        ],
    };
    return (
        <div className="about">
            <Tree data={dataa} />
        </div>
    );
};

export default About;
