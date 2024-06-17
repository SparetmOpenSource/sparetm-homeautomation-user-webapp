import { ResponsiveBar } from '@nivo/bar';

const Bar = ({ data, keyValue, indexBy, barVerticalIndex }: any) => (
    <ResponsiveBar
        data={data}
        keys={keyValue}
        indexBy={indexBy}
        margin={{ top: 30, right: 130, bottom: 60, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={[
            'rgb(151,227,213)',
            'rgb(231,168,57)',
            'rgb(243,230,119)',
            'rgb(232,193,160)',
            'rgb(98,205,187)',
            'rgb(244,117,96)',
        ]}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true,
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
            },
        ]}
        // fill={[
        //     {
        //         match: {
        //             id: 'fries',
        //         },
        //         id: 'dots',
        //     },
        //     {
        //         match: {
        //             id: 'sandwich',
        //         },
        //         id: 'lines',
        //     },
        // ]}
        borderColor={{
            from: 'color',
            modifiers: [['darker', 3]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: indexBy,
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: barVerticalIndex+"(^C)",
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [['darker', 3]],
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e: any) =>
            e?.id + ': ' + e?.formattedValue + ' in country: ' + e?.indexValue
        }
    />
);
export default Bar;
