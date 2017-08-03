import React, { PropTypes } from 'react';

import { getSkillGroup } from '../../common/helpers/index';
import SkillGroup from './SkillGroup';

const Level = ({ categories, levelName, skillGroups, viewSkillDetails }) =>
  (
    <tr>
      <td>{<strong>{levelName}</strong>}</td>
      {
        categories.map(
          categoryName => (
            <SkillGroup
              key={categoryName}
              skillGroup={getSkillGroup(levelName, categoryName, skillGroups)}
              viewSkillDetails={viewSkillDetails}
            />
          ),
        )
      }
    </tr>
  );

Level.propTypes = {
  categories: PropTypes.array.isRequired,
  levelName: PropTypes.string.isRequired,
  skillGroups: PropTypes.object.isRequired,
};

export default Level;
