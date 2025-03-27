import { ClassnameArray } from '.';

describe('utils: ClassnameArray', () => {
  it('should toggle class', () => {
    const classNameArray = new ClassnameArray('a', 'b', 'c');
    expect(classNameArray.toggle('a', false)).toEqual(['b', 'c']);
  });

  it('should clear array', () => {
    const classNameArray = new ClassnameArray('a', 'b', 'c');
    expect(classNameArray.clear()).toEqual([]);
  });
});
