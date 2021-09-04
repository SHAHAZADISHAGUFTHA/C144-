import {React} from 'react';
import {View, Text, FlatList, Stylesheet, Alert, SafeAreaView} from "react-native";
import { ListItem } from "react-native-elements";
import {RFValue} from "react-native-responsive-fontsize";
import axios from "axios";
import { Header } from "react-native/Libraries/NewAppScreen";

export default class HomeScreen extends Component {
    constructor(){
        super();
        this.state = {
            MovieDetails: {}
        };
    }
    componentDidMount(){
        this.getmovie();
    }
    timeConvert(num) {
        var hours = Math.floor(num/60);
        var min = num % 60;
        return `${hours} hrs ${min} mins`;
    }

    getmovie = () => {
        const url = "http://localhost:5000/get-movie";
        axios
        .get(url)
        .then(response => {
            let details = response.data.data;
            details["duration"] = this.timeConvert(details.duration);
            this.setState({ MovieDetails: details });
        })
        .catch(error => {
            Alert.alert(error.message);
        });
    };

    LikedMovies = () => {
        const url = "http://localhost:5000/liked-movie";
        axios
        .post(url)
        .then(response => {
            this.getmovie();
        })
        .catch(error => {
            console.log(error.message);
        });
    };

    UnLikedMovie = () => {
        const url = "http://localhost:5000/unliked-movie";
        axios
        .post(url)
        .then(response => {
            this.getmovie();
        })
        .catch(error => {
            console.log(error.message);
        });
    };

    NotWatchedMovie = () => {
        const url = "http://localhost:5000/notwatched-movie";
        axios
        .post(url)
        .then(response => {
            this.getmovie();
        })
        .catch(error => {
            console.log(error.message);
        });
    };

    render() {
        const { MovieDetails } = this.state;
        if (MovieDetails.poster_link){
            const{
                poster_link,
                title,
                release_date,
                duration,
                overview,
                rating
            } = MovieDetails;
            return(
                <View style={style.container}>
                    <View style={style.headerContainer}>
                        <Header
                            centerComponent={{
                                text: "Movie Recommended",
                                style:style.headerTitle
                            }}
                            rightComponent = {{ icon:"search", color:"#fff"}}
                            backgroundColor = {"#d500f9"}
                            containerStyle = {{flex:1}}
                        />
                    </View>
                    <View style={Styles.SubContainer}>
                        <View style={style.SubTopContainer}>
                            <Image style={styles.posterImage} source={{ uri: poster_link }}/>
                        </View>
                        <View style={styles.SubBottomContainer}>
                            <View style={styles.UpperBottomContainer}>
                                <Text style={styles.Title}>{title}</Text>
                                <Text style={styles.subtitle}>{`${ release_date.split("-")[0]} | ${duration}`}</Text>
                            </View>
                            <View style={styles.MiddleBottomContainer}>
                                <View style={{ flex: 0.3 }}>
                                    <AirbnbRating
                                        count={10}
                                        review={["", "", "", ""]}
                                        defaultRating = {rating}
                                        isDisabled = {true}
                                        size = {RFValue(25)}
                                        StarContainerStyle= {{marginTop: -30}}
                                    />
                                </View>

                                <View style={{flex: 0.7, padding: 15}}>
                                    <Text style={styles.overeview}>{overview}</Text>
                                </View>
                            </View>
                            <View style={styles.LowerBttomContainer}>
                                <View style={styles.IconButtonContainer}>
                                    <TouchableOpacity onPress={this.likedMovie}>
                                        <Icon
                                            reverse
                                            name={"check"}
                                            type={"entypo"}
                                            size={RFValue(30)}
                                            color={"#76ff03"}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.unlikedMovie}>
                                        <Icon
                                            reverse
                                            name={"cross"}
                                            type={"entypo"}
                                            size={RFValue(30)}
                                            color={"#ff1744"}
                                        />
                                    </TouchableOpacity> 
                                </View>
                                <View style={styles.buttonCotainer}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={this.notWatched}
                                    >
                                        <Text style={styles.buttonText}>Did not watch</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      flex: 0.1
    },
    headerTitle: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: RFValue(18)
    },
    subContainer: {
      flex: 0.9
    },
    subTopContainer: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center"
    },
    posterImage: {
      width: "60%",
      height: "90%",
      resizeMode: "stretch",
      borderRadius: RFValue(30),
      marginHorizontal: RFValue(10)
    },
    subBottomContainer: {
      flex: 0.6
    },
    upperBottomContainer: {
      flex: 0.2,
      alignItems: "center"
    },
    title: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      textAlign: "center"
    },
    subtitle: {
      fontSize: RFValue(14),
      fontWeight: "300"
    },
    middleBottomContainer: {
      flex: 0.35
    },
    overview: {
      fontSize: RFValue(13),
      textAlign: "center",
      fontWeight: "300",
      color: "gray"
    },
    lowerBottomContainer: {
      flex: 0.45
    },
    iconButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    buttonCotainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      width: RFValue(160),
      height: RFValue(50),
      borderRadius: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      marginTop: RFValue(15)
    },
    buttonText: {
      fontSize: RFValue(15),
      fontWeight: "bold"
    }
});