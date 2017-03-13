import * as types from '../../types';
import rule from './rule';
import word from './word';
import alt from './alt';

export default {
	[types.RULE]: rule,
	[types.WORD]: word,
	[types.ALTERNATIVE]: alt
};
