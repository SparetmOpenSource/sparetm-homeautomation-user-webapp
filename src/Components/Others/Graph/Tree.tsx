import { ResponsiveTree } from '@nivo/tree';

const Tree = ({ data }: any) => (
    <ResponsiveTree
        data={data}
        identity="name"
        mode="tree"
        activeNodeSize={24}
        inactiveNodeSize={12}
        nodeColor={{ scheme: 'tableau10' }}
        fixNodeColorAtDepth={1}
        linkThickness={2}
        activeLinkThickness={8}
        inactiveLinkThickness={2}
        linkColor={{ from: 'target.color', modifiers: [['opacity', 0.4]] }}
        margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
        meshDetectionRadius={80}
    />
);

export default Tree;
