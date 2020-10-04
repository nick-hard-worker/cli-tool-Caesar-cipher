## cli-tool-Caesar-cipher
Solution for [task#1](https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/TASKS.md#task-1-caesar-cipher-cli-tool) RS School, NodeJS course

#### Usage:
```
 my_caesar_cli [options]
```

Options:
  -a, --action \<action>  required, an action "encode" or "decode"
  -s, --shift \<number>  required, a shift of the cipher
  -i, --input \<input file>  specify an input file. If absent used command line for input text
  -o, --output  \<output file> specify an output file.  If absent used command line for output text
  -h, --help  display help for command

##### Example:
```
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
$ node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt
```