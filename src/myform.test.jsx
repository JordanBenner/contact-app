import React from 'react';
import { MyForm } from './myform';

import {mount, shallow, render} from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
var expect = chai.expect;
test('My form test', () => {
  const wrapper = shallow(
    <MyForm contacts={[]}/>
  );
  expect(wrapper.instance().props.contacts)
    .deep.equal([]);
});
