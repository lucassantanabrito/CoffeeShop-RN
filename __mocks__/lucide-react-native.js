const React = require('react');

const createMockIcon = (name) => {
  const MockIcon = ({size, color, ...props}) => {
    return React.createElement('View', {
      testID: `icon-${name}`,
      style: {width: size, height: size, backgroundColor: color},
      ...props,
    });
  };
  MockIcon.displayName = name;
  return MockIcon;
};

module.exports = {
  Receipt: createMockIcon('Receipt'),
  Clock: createMockIcon('Clock'),
  Hourglass: createMockIcon('Hourglass'),
  CheckCircle: createMockIcon('CheckCircle'),
  Plus: createMockIcon('Plus'),
  ArrowLeft: createMockIcon('ArrowLeft'),
  Coffee: createMockIcon('Coffee'),
  CirclePlus: createMockIcon('CirclePlus'),
};
