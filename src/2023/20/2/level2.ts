import StringStream from "../../../utils/string-stream";

type Signal = "low" | "high";

interface SignalObserver {
  onSignal: (signal: Signal, from: Module, to: Module) => void;
}

class Scheduler {
  private queue = new Array<Module>();
  schedule = (module: Module) => this.queue.push(module);
  dispatch() {
    while (this.queue.length) this.queue.shift()!.tick();
  }
}

abstract class Module {
  readonly inputModules = new Array<Module>();
  readonly outputModules = new Array<Module>();
  private outputBuffer?: Signal;
  constructor(
    public readonly name: string,
    private readonly signalObservers: SignalObserver[],
    protected readonly scheduler: Scheduler,
  ) {}
  abstract onSignal(signal: Signal, from: Module): void;
  protected sendSignalToOutputModules(signal: Signal) {
    this.scheduler.schedule(this);
    this.outputBuffer = signal;
  }
  tick() {
    this.outputModules.forEach((outputModule) => {
      if (!this.outputBuffer) throw new Error("no output in buffer to populate!");
      outputModule.onSignal(this.outputBuffer!, this);
      this.signalObservers.forEach((observer) => observer.onSignal(this.outputBuffer!, this, outputModule));
    });
  }
}

class BroadcastModule extends Module {
  onSignal = () => this.sendSignalToOutputModules("low");
}

class FlipFlopModule extends Module {
  private on = false;
  onSignal(signal: Signal) {
    if (signal === "high") return;
    this.on = !this.on;
    this.sendSignalToOutputModules(this.on ? "high" : "low");
  }
}

class ConjunctionModule extends Module {
  private inputMemory = new Map<Module, Signal>();
  onSignal(signal: Signal, from: Module) {
    this.inputMemory.set(from, signal);
    if (
      this.inputModules
        .map((inputModule) => this.inputMemory.get(inputModule) ?? "low")
        .every((signal) => signal === "high")
    )
      this.sendSignalToOutputModules("low");
    else this.sendSignalToOutputModules("high");
  }
}

class ButtonModule extends BroadcastModule {
  click() {
    this.onSignal();
    this.scheduler.dispatch();
  }
}

class OutputModule extends Module {
  onSignal() {}
}

export function solve(input: StringStream) {
  const scheduler = new Scheduler();
  const signalObservers = new Array<SignalObserver>();
  const modules = Object.fromEntries(
    input.readLines().map((line) => {
      const [, type, name, connections] = line.match(/([%&])?([a-z]+) -> (.*)/)!;
      function createModule(type: string, name: string) {
        if (!type && name === "broadcaster") return new BroadcastModule(name, signalObservers, scheduler);
        if (type === "%") return new FlipFlopModule(name, signalObservers, scheduler);
        if (type === "&") return new ConjunctionModule(name, signalObservers, scheduler);
        throw new Error(`cannot create module ${name}. unknown module type: ${type}.`);
      }
      return [name, { module: createModule(type, name), connections: connections.split(", ") }];
    }),
  );
  for (const { module, connections } of Object.values(modules)) {
    for (const connection of connections) {
      if (!modules[connection])
        modules[connection] = { module: new OutputModule(connection, signalObservers, scheduler), connections: [] };
      const outputModule = modules[connection]?.module;
      module.outputModules.push(outputModule);
      outputModule.inputModules.push(module);
    }
  }
  const button = new ButtonModule("button", signalObservers, scheduler);
  button.outputModules.push(modules["broadcaster"].module);

  const rx = modules["rx"].module;
  if (rx.inputModules.length !== 1) throw new Error("rx must have exactly one input!");
  const inRx = rx.inputModules[0];
  if (!(inRx instanceof ConjunctionModule)) throw new Error("input to rx must be conjunction!");

  let i = 1;
  const nums = new Array<number>();
  signalObservers.push({ onSignal: (signal, _, to) => signal === "high" && to === inRx && nums.push(i) });
  for (; nums.length !== inRx.inputModules.length; i++) button.click();
  return `lcm(${nums.join(", ")})`;
}
