import { to_number } from 'svelte/internal'
import { writeable } from 'svelte/store'

export const typeTemplates = {
    'number': {value: 0.0, evaluate: (value) => {return Number(value)}},
    'bool': {value: 'false', options: ['false', 'true']},
    'string': {value: '', evaluate: (value) => {return String(value)}},
    'object': {value: {}},
    'list': {value: [], type: 'any'},
    'any': {value: {}},
    'vec2': {value: {x: 0.0, y: 0.0}, as: 'object'},
    'vec3': {value: {x: 0.0, y: 0.0, z: 0.0}, as: 'object'},
    'vec4': {value: {x: 0.0, y: 0.0, z: 0.0, w: 0.0}, as: 'object'},
}

export const project = writeable({
    project: {
        name: '',
        authot: '',
        version: ''
    },
    import: {
        formatType: 'proprietary' | 'open'
    },
    build: {
        platform: 'darwin'
    },
    scenes: [],
    resources: {
        textures: {
            'Test.tex': {
                type: 'texture',
                format: 'tex',
                path: ''
            }
        },
        sounds: {
            'Text.aud': {
                type: 'sound',
                format: 'aud',
                path: ''
            }
        },
        others: {
            'Test.vid': {
                type: 'cutscene',
                format: 'vid',
                path: ''
            }
        }
    },
    objects: {
        'Test': {
            components: [],
            inspectorValues: {
                'Transform': {
                    'Position': {x: 0, y: 0, z: 0},
                    'Rotation': {x: 0, y: 0, z: 0},
                    'Scale': {x: 0, y: 0, z: 0},
                }
            }
        }
    },
    components: {
        'Transform': {
            deps: [],
            script: 'Transform',
            in: {
                'Position': {
                    type: 'vec3',
                    from: {
                        component: 'Inspector'
                    },
                    description: ''
                },
                'Rotation': {
                    type: 'vec3',
                    from: {
                        component: 'Inspector'
                    },
                    description: ''
                },
                'Scale': {
                    type: 'vec3',
                    from: {
                        component: 'Inspector'
                    },
                    description: ''
                },
            },
            out: {
                'Position': {
                    type: 'vec3',
                    description: ''
                },
                'Rotation': {
                    type: 'vec3',
                    description: ''
                },
                'Scale': {
                    type: 'vec3',
                    description: ''
                },
            }
        },
        'TestComponent': {
            deps: ['Transform'],
            script: 'Transform.js',
            in: {
                'test': {
                    type: 'vec3',
                    from: {
                        component: 'Transform',
                        out: 'Position'
                    },
                    description: ''
                }
            },
            out: {
                'result': {
                    type: 'bool',
                    description: ''
                }
            }
        }
    }
})