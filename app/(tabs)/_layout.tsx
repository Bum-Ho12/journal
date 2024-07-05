import * as React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { loadCredentials } from '@/store/auth-slice';
import { useDispatch } from 'react-redux';
import { store } from '@/store';
import { User } from '@/utils/types';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  const dispatch = useDispatch()

  const [user,setUser] = React.useState<User|null>(null)

  React.useEffect(()=>{
    const loadUser = async()=>{
      await store.dispatch(loadCredentials()).then(()=>{
        setUser(store.getState().auth.user)
      })
    }
    loadUser()
  },[dispatch])

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerStatusBarHeight: 40,
          title:'',
          tabBarShowLabel:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft:()=>(
            <View style={styles.headerLeftStyle}>
              {user &&<Text style={styles.titleStyle}>{user?.username}</Text>}
              {user && <Text style={styles.subTitleStyle}>{user?.email}</Text>}
            </View>
          ),
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={25} color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'New Journal Note',
          headerTitleStyle:styles.titleStyle,
          tabBarShowLabel:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          headerStyle:styles.headerStyle,
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: 'Summary',
          tabBarShowLabel:false,
          headerTitleStyle:styles.titleStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  headerLeftStyle:{
    flexDirection:'column',
    alignItems:'center',
    marginLeft:10,
    gap: 4, width: '100%',
    marginBottom: 20,
  },
  titleStyle:{
    fontSize: 22,
    fontWeight: 'bold',
    width:'100%'
  },
  subTitleStyle:{
    fontSize: 18,
    color: Colors.light.tint,
    width:'100%'
  },
  headerStyle:{
    // Android shadow elevation
    elevation: 3,
    // iOS shadow color
    shadowColor: '#000',
    // iOS shadow offset
    shadowOffset: { width: 0, height: 2 },
    // iOS shadow opacity
    shadowOpacity: 0.25,
    // iOS shadow radius
    shadowRadius: 3,
  }
})
