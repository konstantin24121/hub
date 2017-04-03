const path = require('path');
const context = process.cwd();

module.exports =
  [
    {
      name: 'Introduction',
      content: './introduction.md',
    },
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Installation and development',
          content: './installation.md',
        },
        {
          name: 'Implements and tools',
          content:'./implements.md',
        },
        {
          name: 'Examples',
          components: path.resolve(context, 'src/components/__examples__/[A-Z]*/[A-Z]*.jsx'),
        },
      ]
    },
    {
      name: 'UI Components',
      components: path.resolve(context, 'src/components/[A-Z]*/[A-Z]*.jsx'),
    },
  ];