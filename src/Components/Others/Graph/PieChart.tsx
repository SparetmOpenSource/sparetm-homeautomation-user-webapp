import { ResponsivePie } from '@nivo/pie';

const PieChart = ({ data, fills }: any) => (
    <ResponsivePie
        data={data}
        margin={{ top: 120, right: 100, bottom: 70, left: 100 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [['darker', 3]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="lavender"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 3]],
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'rgb(8,246,125)',
                color: 'rgba(255, 255, 255, 0.7)',
                size: 4,
                padding: 1,
                stagger: true,
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'rgb(205,80,88)',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 4,
                spacing: 5,
            },
        ]}
        fill={fills}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: 'lavender',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: 'rgb(181,212,59)',
                        },
                    },
                ],
            },
        ]}
    />
);

export default PieChart;
