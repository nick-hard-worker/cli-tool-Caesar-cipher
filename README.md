## cli-tool-Caesar-cipher
Solution for [task#1](https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/TASKS.md#task-1-caesar-cipher-cli-tool) RS School, NodeJS course

#### Install:
```
 git clone https://github.com/nick-hard-worker/cli-tool-Caesar-cipher.git
 cd task1
 npm install
```

#### Usage:
```
 my_caesar_cli [options]
```

Options:
  -a, --action \<action>  required, an action "encode" or "decode"
  -s, --shift \<number>  required, a shift of the cipher
  -i, --input \<input file>  specify an input file. If option is absent use command line for input text
  -o, --output  \<output file> specify an output file.  If option is absent result will be in the stdout
  -h, --help  display help for command

##### Example:
```
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
$ node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt
```