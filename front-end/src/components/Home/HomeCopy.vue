<template>
    <div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <div class='tree-box'>
            hi
        </div>
        <div class="code-box" id="code-box">
            <codemirror v-model="code" :options="cmOption"></codemirror>
        </div>
    </div>
</template>

<script>
    import api2html from '@/js/api2html';
    import renderTree from '@/js/renderTree';
    // language
    import 'codemirror/mode/javascript/javascript.js'
    // theme css
    import 'codemirror/theme/monokai.css'
    // require active-line.js
    import'codemirror/addon/selection/active-line.js'
    // styleSelectedText
    import'codemirror/addon/selection/mark-selection.js'
    import'codemirror/addon/search/searchcursor.js'
    // hint
    import'codemirror/addon/hint/show-hint.js'
    import'codemirror/addon/hint/show-hint.css'
    import'codemirror/addon/hint/javascript-hint.js'
    import'codemirror/addon/selection/active-line.js'
    // highlightSelectionMatches
    import'codemirror/addon/scroll/annotatescrollbar.js'
    import'codemirror/addon/search/matchesonscrollbar.js'
    import'codemirror/addon/search/searchcursor.js'
    import'codemirror/addon/search/match-highlighter.js'
    // keyMap
    import'codemirror/mode/clike/clike.js'
    import'codemirror/addon/edit/matchbrackets.js'
    import'codemirror/addon/comment/comment.js'
    import'codemirror/addon/dialog/dialog.js'
    import'codemirror/addon/dialog/dialog.css'
    import'codemirror/addon/search/searchcursor.js'
    import'codemirror/addon/search/search.js'
    import'codemirror/keymap/sublime.js'
    // foldGutter
    import'codemirror/addon/fold/foldgutter.css'
    import'codemirror/addon/fold/brace-fold.js'
    import'codemirror/addon/fold/comment-fold.js'
    import'codemirror/addon/fold/foldcode.js'
    import'codemirror/addon/fold/foldgutter.js'
    import'codemirror/addon/fold/indent-fold.js'
    import'codemirror/addon/fold/markdown-fold.js'
    import'codemirror/addon/fold/xml-fold.js'
    import { codemirror } from 'vue-codemirror'
    import * as API from '${name}';
    export default {
        name: 'Home',
        components: {
            codemirror
        },
        methods: {
            changeCode(code) {
                this.code = code;
            },
        },
        data () {
            return {
                input: '',
                code: '',
                x: '-1000px',
                y: '0',
                cmOption: {
                    tabSize: 4,
                    styleActiveLine: false,
                    lineNumbers: true,
                    styleSelectedText: false,
                    line: true,
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
                    mode: 'text/javascript',
                    // hint.js options
                    hintOptions:{
                        // 当匹配只有一项的时候是否自动补全
                        completeSingle: false
                    },
                    //快捷键 可提供三种模式 sublime、emacs、vim
                    keyMap: "sublime",
                    matchBrackets: true,
                    showCursorWhenSelecting: true,
                    theme: "monokai",
                    extraKeys: { "Ctrl": "autocomplete" }
                }
            }
        },
        mounted() {
            const data = api2html(API, '${name}');
            const boxSelector = '.tree-box';
            renderTree(boxSelector, data, (d) => {
                const {value} = d.data;
                const keys = value && Object.keys(value).join(': \n') || '找不到值';
                const code = value && value.toString && value.toString() || keys;
                this.changeCode(code);
            });
            setTimeout(() => {
                this.styleSelectedText =  true,
                    this.cmOption.styleActiveLine = true
            }, 1800)
        }
    }
</script>

<style>
    @import './Home.less';
    #code-box .CodeMirror-sizer {
        text-align: left !important;
    }
    .CodeMirror-focused .cm-matchhighlight {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVQI12NgYGBgkKzc8x9CMDAwAAAmhwSbidEoSQAAAABJRU5ErkJggg==);
        background-position: bottom;
        background-repeat: repeat-x;
    }
    .CodeMirror {
        height: 100% !important;
    }
    .cm-matchhighlight {
        background-color: red !important;
    }
    .cm-s-monokai span.cm-attribute, .cm-s-monokai span.cm-property {

    }
    .cm-matchhighlight {background-color: lightgreen}
    .CodeMirror-selection-highlight-scrollbar {background-color: green}
</style>
