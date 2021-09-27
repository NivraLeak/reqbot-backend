module.exports = {
    content: [
        {
            color: '#444',
            style: 'header',
            table: {
                heights: ['*', 120, 70, 70, 70, 100],
                widths: [170, '*', 300],
                headerRows:1,
                body: [
                    [ {text: "Header" ,colSpan: 3, alignment: 'center'},{},{} ],
                    [ {
                        stack:  [
                            'Numero',
                            { text:' ', style: 'numberUs' },
                            { text:'1', style: 'numberUs'},
                            { text:' ', style: 'numberUs' },
                        ]
                    }, {
                        stack:  [
                            'Column 02',
                            { text:' ', style: 'numberUs' },
                            { text:' ', style: 'numberUs' },
                            { text:' ', style: 'numberUs' },
                            { text:' ', style: 'numberUs' },
                            { text:' ', style: 'numberUs' },
                            { text:'1', style: 'numberUs' },

                        ],  colSpan:2, rowSpan:4, alignment: 'center'},{} ],
                    [ {
                        stack:  [
                            'Prioridad',
                            { text:' ', style: 'numberUs' },
                            { text:'item 1', style: 'numberUs'},
                            { text:' ', style: 'numberUs' },
                        ]
                    }, {}
                    ],
                    [ {
                        stack:  [
                            'Prioridad',
                            { text:' ', style: 'numberUs' },
                            { text:'item 1', style: 'numberUs'},
                            { text:' ', style: 'numberUs' },
                        ]
                    }, {}],
                    [ {
                        stack:  [
                            'Prioridad',
                            { text:' ', style: 'numberUs' },
                            { text:'item 1', style: 'numberUs'},
                            { text:' ', style: 'numberUs' },
                        ]
                    }, {}],
                    [ {

                        stack:  [
                            'Prioridad',
                            { text:' ', style: 'numberUs' },
                            { text:'item 1', style: 'numberUs'},
                            { text:' ', style: 'numberUs' },
                        ],
                        colSpan:3}, {},{}]

                ]
            }
        }
    ],
}
