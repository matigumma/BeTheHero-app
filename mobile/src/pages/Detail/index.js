import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import * as MailComposer from "expo-mail-composer";

import styles from "./styles";
import LogoImg from "../../assets/logo.png";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  const textoBody = `Hola ${incident.name}, me gustaria ayudar en el caso del ${incident.title} con ${incident.value}`;
  function navigateBack() {
    navigation.goBack();
  }
  function navigateTo() {
    navigation.navigate("Incidents");
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Hero del caso: ${incident.title}`,
      recipients: [incident.email],
      body: textoBody
    });
  }
  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${textoBody}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS"
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve el dia!</Text>
        <Text style={styles.heroTitle}>Sea el heroe de este caso.</Text>

        <Text style={styles.heroDescription}>Entre en contacto:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
