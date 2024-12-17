import StringStream from "../../../utils/string-stream";

export function runProgram(program: number[], registers: { a: number; b: number; c: number }) {
  let ir = 0;
  const stdout: number[] = [];

  while (program[ir] !== undefined) {
    const opcode = program[ir];
    const literalOperand = program[ir + 1];

    const comboOperand = () => {
      if (literalOperand >= 0 && literalOperand <= 3) return literalOperand;
      else if (literalOperand === 4) return registers.a;
      else if (literalOperand === 5) return registers.b;
      else if (literalOperand === 6) return registers.c;
      else throw new Error(`unknown combo operand for literal operand: ${literalOperand}`);
    };

    if (opcode === 0) registers.a = Math.floor(registers.a / 2 ** comboOperand());
    else if (opcode === 1) registers.b = registers.b ^ literalOperand;
    else if (opcode === 2) registers.b = comboOperand() % 8 & 7;
    else if (opcode === 3 && registers.a !== 0) {
      ir = literalOperand;
      continue;
    } else if (opcode === 4) registers.b = registers.b ^ registers.c;
    else if (opcode === 5) stdout.push(comboOperand() % 8);
    else if (opcode === 6) registers.b = Math.floor(registers.a / 2 ** comboOperand());
    else if (opcode === 7) registers.c = Math.floor(registers.a / 2 ** comboOperand());

    ir += 2;
  }

  return stdout;
}

export function solve(_input: StringStream) {
  const a = Number(_input.readLine()!.match(/\d+/)![0]);
  const b = Number(_input.readLine()!.match(/\d+/)![0]);
  const c = Number(_input.readLine()!.match(/\d+/)![0]);
  _input.readLine();
  const program = _input.readLine()!.match(/\d+/g)!.map(Number);

  return runProgram(program, { a, b, c }).join(",");
}
