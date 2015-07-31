var React = require('react-native');

var styles = require('./issue-list.styles');
var ColorField = require('../../blocks/color-field/color-field');

var {View, Text, TouchableHighlight} = React;

class IssueRow extends React.Component {
    static _getSubText(issue) {

        var forText = () => {
            if (issue.fieldHash.Assignee) {
                return 'for ' + issue.fieldHash.Assignee[0].fullName;
            }
            return '    Unassigned'
        };

        return `${issue.id} by ${issue.fieldHash.reporterFullName} ${forText()}`
    }

    getSummaryStyle(issue) {
        if (issue.fieldHash.resolved) {
            return {
                color: '#888'
            };
        }
    }

    render() {
        let issue = this.props.issue;
        return (
            <TouchableHighlight underlayColor='#FFF' onPress={() => this.props.onClick(issue)}>
                <View>
                    <View style={styles.row}>
                        <View>
                            {issue.fieldHash.Priority ? <ColorField field={issue.fieldHash.Priority}></ColorField> : <View/>}
                        </View>
                        <View style={styles.rowText}>
                            <Text style={[styles.summary, this.getSummaryStyle(issue)]}>
                                {issue.fieldHash.summary}
                            </Text>
                            <Text style={styles.subtext}>{IssueRow._getSubText(issue)}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }
}

module.exports = IssueRow;