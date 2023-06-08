import { parseISO, formatDistanceToNow, format } from 'date-fns';
import PropTypes from 'prop-types';

const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={format(new Date(), 'dd-MM-yyyy/hh:mm aaa').split('/').join(' at ')}>
      &nbsp;
      <i>{timeAgo}</i>
    </span>
  );
};

TimeAgo.propTypes = {
  timestamp: PropTypes.string.isRequired,
};

export default TimeAgo;
