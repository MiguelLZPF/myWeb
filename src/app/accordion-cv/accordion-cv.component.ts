import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ExperienceItem } from 'src/models/ExperienceItem';

const EXPERIENCE = [
  new ExperienceItem('[05/19 - Now]', 'Software Developer:',
    'Software Development of internal bank operative using Appian tecnologies.',
    'Grupo Avalon - Santander Global Tech'
  ),
  new ExperienceItem('[01/09 - Now]', 'Custom Computer Builder:',
    'I’ve been building my own computer since I have one. From full air cooled full desktop PC to liquid cooling full custom loop PC.',
    'Owned Skill'
  ),
  new ExperienceItem('[08/18 - 04/19]', 'Inspector of cell base stations:',
    'Software Development of internal bank operative using Appian tecnologies.',
    'EUROCONTROL S.A'
  ),
  new ExperienceItem('[01/18 - 10/18]', 'Final Master Project:',
    'Proposing a Blockchain/Tangle based system in the Santander’s SmartCity Network.',
    'University of Cantabria'
  ),
  new ExperienceItem('[09/15 - 07/16]', 'Final Degree Project:',
    'On the management of resources in public indoor spaces. \
    Using RaspberryPi development based on REST Web Services using JAVA programming.',
    'University of Cantabria'
  )
];

const EDUCATION = [
  new ExperienceItem('[2016 - 2018]', 'Master\'s Degree in Telecommunication Engineering',
    '',
    'University of Cantabria'
  ),
  new ExperienceItem('[2011 - 2016]', 'Graduate in Telecommunication Tecnology Engineering',
    '',
    'University of Cantabria'
  ),
  new ExperienceItem('[2009 - 2011]', 'Bachelor\'s Degree in Science and Technology',
    '',
    'IES Miguel Herrero'
  ),
  new ExperienceItem('[-------- - 2009]', 'School graduate',
    '',
    'Cooperativa de Enseñanza El Salvador'
  )
];

const CERT = [
  new ExperienceItem('[2019]', 'Object Oriented Programming using Java',
    '',
    'Arquitectura Java (Cecilio Alvarez) - Grupo Avalon'
  ),
  new ExperienceItem('[2019]', 'Angular 7 and Typescript Introduction',
    '',
    'Arquitectura Java (Cecilio Alvarez) - Grupo Avalon'
  ),
  new ExperienceItem('[2014]', 'Programming Mobile Applications for Android Handheld Systems',
    '',
    'Coursera - University of Maryland'
  ),
  new ExperienceItem('IN Progress', 'IN Progress',
    '',
    'IN Progress'
  )
];

@Component({
  selector: 'app-accordion-cv',
  templateUrl: './accordion-cv.component.html',
  styleUrls: ['./accordion-cv.component.css']
})

export class AccordionCVComponent implements OnInit {
  experience = EXPERIENCE;
  education = EDUCATION;
  cert = CERT;
  panel0OpenState = false;
  panel1OpenState = false;
  panel2OpenState = false;
  panel3OpenState = false;
  panel4OpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  constructor( private matIconRegistry: MatIconRegistry, private domSanitzer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'linkedin_icon',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'telegram_icon',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/telegram.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'whatsapp_icon',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/whatsapp.svg')
    )
   }

  ngOnInit() {
  }

}
