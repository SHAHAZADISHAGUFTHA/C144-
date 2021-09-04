import {Component, React} from 'react';
import {View, Text, FlatList, Stylesheet, Alert, SafeAreaView} from "react-native";
import { ListItem } from "react-native-elements";
import {RFValue} from "react-native-responsive-fontsize";
import axios from "axios";

export default class RecommendedScreen extends Component{
    constructor(props){
        super();
        this.state = { data: [] };
    }

    componentDidMount(){
        this.getData();
    }
    getData = () =>{
        const url = "https://localhost:5000/recommended-movies";
        axios
        .get(url)
        .then(async response => {
            this.setState({ data: response.data.data });
        })
        .catch(error => {
            console.log(error.message);
        });
    };

    keyExtractor = (item, index) => index.toString();

    renderItems = ({ item, index}) => {
        return(
            <Card
                key={`card-${index}`}
                image={{ uri: item.poster_link}}
                imageProps={{ resizeMode: "cover"}}
                featuredTitle = {item.poster_link}
                containerStyle = {styles.cardcontainer}
                featuredTitleStyle = {styles.title}
                featuredSubTitle = {`${
                    item.release_date.split("-")[0]
                } | ${this.timeConvert(item.duration)}`}
                featuredSubTitleStyle = {styles.subtitle}
                ></Card>
        );
    };

    render(){
        const{ data } = this.state;
        return(
            <View style={styles.container}>
                <FlatList 
                data = {data}
                keyExtractor = {this.keyExtractor}
                renderItem = {this.renderItems}
            />
            </View>
        );
    }
}

const styles = Stylesheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff"
    },
    title:{
        color:"#fff",
        alignSelf: "flex-start",
        paddingLeft: RFValue(15),
        fontSize: RFValue(25),
        marginTop: RFValue(65),
    },
    subtitle:{
        fontWeight: "bold";
        alignSelf: "flex-start",
        paddingLeft: RFValue(15),
        fontSize: RFValue(25),
    },
    cardcontainer:{
        flex: 1,
        borderRadius: RFValue(10),
        justifyContent: "center",
        height: RFValue(110),
        marginBottom: RFValue(20)
    }
});