import StringStream from "../../../utils/string-stream";

type Signal = "low" | "high";

interface SignalObserver {
  onSignal: (signal: Signal, from: Module, to: Module) => void;
}

class SignalCounter implements SignalObserver {
  protected _lowSignalCount = 0;
  protected _highSignalCount = 0;
  get lowSignalCount() {
    return this._lowSignalCount;
  }
  get highSignalCount() {
    return this._highSignalCount;
  }
  onSignal(signal: Signal) {
    if (signal === "low") this._lowSignalCount++;
    if (signal === "high") this._highSignalCount++;
  }
}

class SignalLogger implements SignalObserver {
  onSignal = (signal: Signal, from: Module, to: Module) => console.log(`${from.name} -${signal}-> ${to.name}`);
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
  const signalCounter = new SignalCounter();
  const signalLogger = new SignalLogger();
  const signalObservers = [signalCounter, signalLogger];

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
      let outputModule: Module = modules[connection]?.module;
      if (!outputModule) outputModule = new OutputModule(connection, signalObservers, scheduler);
      module.outputModules.push(outputModule);
      outputModule.inputModules.push(module);
    }
  }
  const button = new ButtonModule("button", signalObservers, scheduler);
  button.outputModules.push(modules["broadcaster"].module);

  for (let i = 0; i < 1000; i++) button.click();
  return signalCounter.lowSignalCount * signalCounter.highSignalCount;
}
