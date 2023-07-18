import {Pipeline as PipelineType} from "../../../../models/Pipeline";
import {NODE_TYPE} from "../../../../enums/nodeType.enum";

export const examplePipeline: PipelineType = {
    id: '1',
    name: 'Lieferschein-Erfassung',
    description: 'Erfassung von Lieferscheinen jeglicher Art',
    created: '2023-07-12T12:00:00Z',
    templates: [
        {
            id: '1',
            name: 'Datenimport',
            type: 'input',
            sources: [{
                dataUrl: 'www.test-url.de',
                type: 'file',
            }],
            created: '2023-07-12T12:00:00Z',
            operations: [
                {
                    id: '1',
                    type: 'prepare-data',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                }]
        },
        {
            id: '2',
            name: 'Parameterextraktion',
            type: 'process',
            description: 'Extraktion von Parametern aus Lieferscheinen je nachdem welche wichtig sein, wer, von wo, wohin, was, wie viel, etc.',
            created: '2023-07-12T12:00:00Z',
            operations: [
                {
                    id: '1',
                    type: 'key-value-extraction',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
                {
                    id: '2',
                    type: 'transform-to-csv',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
                {
                    id: '3',
                    type: 'transform-to-xlsx',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
            ]
        },
        {
            id: '3',
            name: 'Datenimport',
            type: 'process',
            sources: [{
                dataUrl: 'www.test-url.de',
                type: 'file',
            }],
            created: '2023-07-12T12:00:00Z',
            operations: [
                {
                    id: '1',
                    type: 'key-value-extraction',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
                {
                    id: '2',
                    type: 'transform-to-csv',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
                {
                    id: '3',
                    type: 'transform-to-xlsx',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
            ]
        },
        {
            id: '4',
            name: 'Datenimport',
            type: 'process',
            sources: [{
                dataUrl: 'www.test-url.de',
                type: 'file',
            }],
            created: '2023-07-12T12:00:00Z',
            operations: [
                {
                    id: '1',
                    type: 'key-value-extraction',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Analysiere den Lieferschein und extrahiere alles was wirtschaftlich relevant ist in kurzen sauberen Sätzen und lasse keine wichtigen Daten aus!"
                    }
                },
                {
                    id: '2',
                    type: 'transform-to-csv',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
                {
                    id: '3',
                    type: 'transform-to-xlsx',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
            ]
        },
        {
            id: '5',
            name: 'Datenimport',
            type: 'process',
            sources: [{
                dataUrl: 'www.test-url.de',
                type: 'file',
            }],
            created: '2023-07-12T12:00:00Z',
            operations: [
                {
                    id: '1',
                    type: 'key-value-extraction',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Analysiere den Lieferschein und extrahiere alles was wirtschaftlich relevant ist in kurzen sauberen Sätzen und lasse keine wichtigen Daten aus!"
                    }
                },
                {
                    id: '2',
                    type: 'transform-to-csv',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
                {
                    id: '3',
                    type: 'transform-to-xlsx',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type:"prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
            ]
        },
        {
            id: '6',
            name: 'Datenimport',
            type: 'process',
            sources: [{
                dataUrl: 'www.test-url.de',
                type: 'file',
            }],
            created: '2023-07-12T12:00:00Z',
            operations: [
                {
                    id: '1',
                    type: 'key-value-extraction',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type:"prompt",
                        text: "Analysiere den Lieferschein und extrahiere alles was wirtschaftlich relevant ist in kurzen sauberen Sätzen und lasse keine wichtigen Daten aus!"
                    }
                },
                {
                    id: '2',
                    type: 'transform-to-csv',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
                {
                    id: '3',
                    type: 'transform-to-xlsx',
                    created: '2023-07-12T12:00:00Z',
                    operator: {
                        type: "prompt",
                        text: "Wandle das Ergebnis in eine Tabelle um, dabei sollen die Keys in der ersten Spalte und die Values in der zweiten Spalte stehen. Die deiner Meinung nach wichtigsten Keys oben."
                    }
                },
            ]
        },
        // {
        //     id: '7',
        //     name: 'CSV-Export',
        //     type: 'output',
        //     created: '2023-07-12T12:00:00Z',
        //     operations: [{
        //         id: '1',
        //         type: 'export',
        //         created: '2023-07-12T12:00:00Z',
        //         operator: 'download'
        //     }]
        // },
        {
            id: '8',
            name: NODE_TYPE.ADD_TEMPLATE_NODE,
            type: 'process',
            created: '2023-07-12T12:00:00Z',
        }
    ],
}
