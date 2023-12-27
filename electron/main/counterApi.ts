import { ipcMain } from 'electron'
import { CounterApi } from '@generated/apis/CounterApi'
import { Counter } from '@generated/models/Counter'


export class CounterApiImpl extends CounterApi {
    protected counters: Map<string, Counter> = new Map();
    protected ids: number = 0;

    public constructor() {
        super(ipcMain);
    }
    async getCounter(_: Electron.IpcMainInvokeEvent, counterId: string): Promise<Counter> {
        const counter: Counter | undefined = this.counters.get(counterId)
        if(counter === undefined)
            throw new Error(`Counter with id ${counterId} cannot be found.`);
        return counter;
    }
    async getCounters(event: Electron.IpcMainInvokeEvent): Promise<Counter[]> {
        return Array.from(this.counters.values())
    }
    async setValue(event: Electron.IpcMainInvokeEvent, counterId: string, body: number): Promise<Counter> {
        // Ensure it exist
        await this.getCounter(event, counterId);
        // Create a new counter
        const counter = new Counter(counterId, body);
        // Replace existing
        this.counters.set(counterId, counter);
        return counter;
    }

    async createCounter(_: Electron.IpcMainInvokeEvent, body: number): Promise<Counter> {
        const counter = new Counter(`${this.ids}`, body);
        this.ids ++;
        this.counters.set(counter.id, counter);
        return counter;
    }
    async deleteCounter(event: Electron.IpcMainInvokeEvent, counterId: string): Promise<void> {
        this.counters.delete(counterId);
    }
}
