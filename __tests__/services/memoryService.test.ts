import {MemoryDrinkService} from '../../src/services/memoryService';

describe('MemoryDrinkService', () => {
  it('seeds the catalog with the expected hasMilk flags', async () => {
    const service = new MemoryDrinkService();
    const options = await service.getDrinkOptions();

    const byType = Object.fromEntries(options.map(o => [o.type, o]));
    expect(byType.espresso.hasMilk).toBe(false);
    expect(byType.v60.hasMilk).toBe(false);
    expect(byType.latte.hasMilk).toBe(true);
    expect(byType.mocha.hasMilk).toBe(true);
    expect(byType.chocolate_quente.hasMilk).toBe(true);
    expect(byType.cappuccino.hasMilk).toBe(true);
  });

  it('adds a new drink and keeps it in the catalog', async () => {
    const service = new MemoryDrinkService();
    const initialCount = (await service.getDrinkOptions()).length;

    const created = await service.addDrink({
      label: 'Chai Latte',
      price: 17.5,
      hasMilk: true,
    });

    const options = await service.getDrinkOptions();
    expect(options).toHaveLength(initialCount + 1);
    expect(options.find(o => o.type === created.type)).toEqual(created);
    expect(created.label).toBe('Chai Latte');
    expect(created.hasMilk).toBe(true);
  });

  it('does not share catalog state between instances', async () => {
    const serviceA = new MemoryDrinkService();
    const serviceB = new MemoryDrinkService();

    await serviceA.addDrink({label: 'Chai Latte', price: 17.5, hasMilk: true});

    expect(await serviceA.getDrinkOptions()).toHaveLength(7);
    expect(await serviceB.getDrinkOptions()).toHaveLength(6);
  });

  it('adds the milk surcharge only for drinks that have milk', () => {
    const service = new MemoryDrinkService();

    expect(service.getDrinkPrice('latte', 'vegetal')).toBeCloseTo(18.0 + 4.0);
    expect(service.getDrinkPrice('v60', 'vegetal')).toBeCloseTo(15.0);
  });
});
