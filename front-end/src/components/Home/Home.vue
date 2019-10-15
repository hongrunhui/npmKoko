<template>
    <div class="home"
         v-loading="isLoading"
    >
        <div class="header">
            <el-input v-model="input" placeholder="请输入内容"
                      @keyup.enter.native="npmSelect"
            ></el-input>
        </div>
        <div class="content">
            <div class='tree-box'>
                hi
            </div>
            <div class="code-box" id="code-box">
                <codemirror v-model="code" :options="cmOption"></codemirror>
            </div>
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
    import * as API from 'cheerio';
    // import
    import axios from 'axios';
    export default {
        name: 'Home',
        components: {
            codemirror
        },
        methods: {
            changeCode(code) {
                this.code = code;
            },
            npmSelect(e) {
                const {value} = e.target;
                if (value) {
                    this.isLoading = true;
                    axios.post(`/npm`, {
                        name: value
                    }).then(result => {
                        this.isLoading = false;
                        const {data, status} = result;
                        if (status === 200) {
                            window.location.reload();
                        }
                        console.log('data', data);
                    })
                }
                console.log('e', e);
            }
        },
        data () {
            return {
                isLoading: false,
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
            const data = api2html(API, 'cheerio');
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
<style lang="less" >
    @import './home.less';
</style>
